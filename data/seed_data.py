# File: data/seed_data.py
# What this does: Populates BigQuery with 15 mock SKUs, 90 days of orders,
# supplier quotes (one overpriced), and realistic return rates.
# The 'findings' are baked in so agents always have something interesting to say.
import os
import random
import uuid
from datetime import date, timedelta
from google.cloud import bigquery

QUOTE_DATE = (date.today() - timedelta(days=30)).isoformat()  # dynamic, ~1 month ago

PROJECT_ID = os.environ.get('PROJECT_ID', 'margin-ai-2026')
DATASET_ID = 'margin_data'

client = bigquery.Client(project=PROJECT_ID)

# ── 15 SKUs ──────────────────────────────────────────────────────────────────
# cost_price = what we pay supplier
# selling_price = what customer pays
# channel_fee_pct = % Amazon/Shopify takes
PRODUCTS = [
    {'sku_id': 'SKU001', 'sku_name': 'Rose Gold Anklet', 'category': 'Jewellery', 'cost_price': 280, 'selling_price': 799, 'channel': 'Amazon', 'channel_fee_pct': 15, 'shipping_cost': 50},
    {'sku_id': 'SKU002', 'sku_name': 'Rose Gold Anklet', 'category': 'Jewellery', 'cost_price': 280, 'selling_price': 749, 'channel': 'Shopify', 'channel_fee_pct': 2, 'shipping_cost': 40},
    {'sku_id': 'SKU003', 'sku_name': 'Brass Oxidised Ring', 'category': 'Jewellery', 'cost_price': 180, 'selling_price': 499, 'channel': 'Amazon', 'channel_fee_pct': 15, 'shipping_cost': 40},
    {'sku_id': 'SKU004', 'sku_name': 'Brass Oxidised Ring', 'category': 'Jewellery', 'cost_price': 180, 'selling_price': 449, 'channel': 'Shopify', 'channel_fee_pct': 2, 'shipping_cost': 30},
    {'sku_id': 'SKU005', 'sku_name': 'Kundan Necklace Set', 'category': 'Jewellery', 'cost_price': 850, 'selling_price': 1999, 'channel': 'Amazon', 'channel_fee_pct': 15, 'shipping_cost': 80},
    {'sku_id': 'SKU006', 'sku_name': 'Kundan Necklace Set', 'category': 'Jewellery', 'cost_price': 850, 'selling_price': 1899, 'channel': 'Shopify', 'channel_fee_pct': 2, 'shipping_cost': 70},
    # SKU007: the money-losing SKU — high cost, high returns, high fees
    {'sku_id': 'SKU007', 'sku_name': 'Silver Toe Ring (Pack of 4)', 'category': 'Jewellery', 'cost_price': 320, 'selling_price': 399, 'channel': 'Amazon', 'channel_fee_pct': 18, 'shipping_cost': 60},
    {'sku_id': 'SKU008', 'sku_name': 'Temple Earrings Gold', 'category': 'Jewellery', 'cost_price': 420, 'selling_price': 1199, 'channel': 'Shopify', 'channel_fee_pct': 2, 'shipping_cost': 50},
    {'sku_id': 'SKU009', 'sku_name': 'Beaded Bracelet Set', 'category': 'Accessories', 'cost_price': 90, 'selling_price': 349, 'channel': 'Amazon', 'channel_fee_pct': 15, 'shipping_cost': 35},
    {'sku_id': 'SKU010', 'sku_name': 'Beaded Bracelet Set', 'category': 'Accessories', 'cost_price': 90, 'selling_price': 299, 'channel': 'Shopify', 'channel_fee_pct': 2, 'shipping_cost': 30},
    {'sku_id': 'SKU011', 'sku_name': 'Macrame Wall Hanging', 'category': 'Home Decor', 'cost_price': 550, 'selling_price': 1499, 'channel': 'Shopify', 'channel_fee_pct': 2, 'shipping_cost': 120},
    {'sku_id': 'SKU012', 'sku_name': 'Jute Tote Bag', 'category': 'Bags', 'cost_price': 150, 'selling_price': 599, 'channel': 'Amazon', 'channel_fee_pct': 15, 'shipping_cost': 45},
    {'sku_id': 'SKU013', 'sku_name': 'Jute Tote Bag', 'category': 'Bags', 'cost_price': 150, 'selling_price': 549, 'channel': 'Shopify', 'channel_fee_pct': 2, 'shipping_cost': 40},
    {'sku_id': 'SKU014', 'sku_name': 'Ceramic Planter Set', 'category': 'Home Decor', 'cost_price': 380, 'selling_price': 1099, 'channel': 'Shopify', 'channel_fee_pct': 2, 'shipping_cost': 90},
    {'sku_id': 'SKU015', 'sku_name': 'Hand-painted Diary', 'category': 'Stationery', 'cost_price': 120, 'selling_price': 399, 'channel': 'Amazon', 'channel_fee_pct': 15, 'shipping_cost': 35},
]

# Insert products
table_ref = f'{PROJECT_ID}.{DATASET_ID}.products'
errors = client.insert_rows_json(table_ref, PRODUCTS)
if not errors:
    print('Products inserted')
else:
    print('Product errors:', errors)

# ── SUPPLIER QUOTES ───────────────────────────────────────────────────────────
# SourceSense will find that supplier for SKU001 is overcharging ₹130/unit
QUOTES = [
    {'sku_id': 'SKU001', 'supplier_name': 'Sharma Jewels Pvt Ltd', 'unit_cost': 420, 'moq': 100, 'market_benchmark': 290, 'quote_date': QUOTE_DATE},
    {'sku_id': 'SKU003', 'supplier_name': 'Gupta Metals Co', 'unit_cost': 195, 'moq': 200, 'market_benchmark': 185, 'quote_date': QUOTE_DATE},
    {'sku_id': 'SKU005', 'supplier_name': 'Rajasthan Craft House', 'unit_cost': 860, 'moq': 50, 'market_benchmark': 875, 'quote_date': QUOTE_DATE},
    {'sku_id': 'SKU007', 'supplier_name': 'Sharma Jewels Pvt Ltd', 'unit_cost': 320, 'moq': 500, 'market_benchmark': 290, 'quote_date': QUOTE_DATE},
    {'sku_id': 'SKU008', 'supplier_name': 'Chennai Temple Arts', 'unit_cost': 415, 'moq': 100, 'market_benchmark': 420, 'quote_date': QUOTE_DATE},
    {'sku_id': 'SKU009', 'supplier_name': 'Bead World Exports', 'unit_cost': 88, 'moq': 1000, 'market_benchmark': 85, 'quote_date': QUOTE_DATE},
    {'sku_id': 'SKU011', 'supplier_name': 'Craft Village Jaipur', 'unit_cost': 545, 'moq': 30, 'market_benchmark': 550, 'quote_date': QUOTE_DATE},
    {'sku_id': 'SKU012', 'supplier_name': 'Green Jute Co', 'unit_cost': 148, 'moq': 500, 'market_benchmark': 145, 'quote_date': QUOTE_DATE},
    {'sku_id': 'SKU014', 'supplier_name': 'Pottery Barn India', 'unit_cost': 375, 'moq': 50, 'market_benchmark': 380, 'quote_date': QUOTE_DATE},
    {'sku_id': 'SKU015', 'supplier_name': 'Handcraft Diaries', 'unit_cost': 118, 'moq': 200, 'market_benchmark': 115, 'quote_date': QUOTE_DATE},
]

errors = client.insert_rows_json(f'{PROJECT_ID}.{DATASET_ID}.supplier_quotes', QUOTES)
if not errors:
    print('Supplier quotes inserted')
else:
    print('Quote errors:', errors)

# ── ORDERS: 90 days ──────────────────────────────────────────────────────────
# Return rates baked in:
#   SKU001 (Amazon): 31% return rate — high because product looks different in photos
#   SKU001 (Shopify): 4% return rate — same product, clear photos, accurate description
#   SKU007 (Amazon): 22% return rate — poor value, sizing issues
#   All others: 5–8% return rate
RETURN_CONFIG = {
    'SKU001_Amazon':  {'rate': 0.31, 'reason': 'Product looks different from photos'},
    'SKU001_Shopify': {'rate': 0.04, 'reason': 'Accurate listing'},
    'SKU007_Amazon':  {'rate': 0.22, 'reason': 'Poor quality relative to price'},
}

orders = []
base_date = date.today() - timedelta(days=90)  # always 90 days back from today

for product in PRODUCTS:
    sku = product['sku_id']
    channel = product['channel']
    config_key = f"{sku}_{channel}"
    return_rate = RETURN_CONFIG.get(config_key, {}).get('rate', random.uniform(0.04, 0.08))
    return_reason = RETURN_CONFIG.get(config_key, {}).get('reason', 'Other')

    # Generate random orders over 90 days
    num_orders = random.randint(40, 120)
    for _ in range(num_orders):
        order_date = base_date + timedelta(days=random.randint(0, 89))
        returned = random.random() < return_rate
        orders.append({
            'order_id': str(uuid.uuid4()),
            'sku_id': sku,
            'channel': channel,
            'order_date': order_date.isoformat(),
            'revenue': product['selling_price'],
            'units_sold': 1,
            'returned': returned,
            'return_reason': return_reason if returned else '',
        })

# BigQuery batch insert
batch_size = 500
for i in range(0, len(orders), batch_size):
    batch = orders[i:i + batch_size]
    errors = client.insert_rows_json(f'{PROJECT_ID}.{DATASET_ID}.orders', batch)
    if errors:
        print(f'Order batch {i} errors:', errors)

print(f'{len(orders)} orders inserted successfully!')
