# File: data/setup_bigquery.py
# What this does: Creates a BigQuery dataset called 'margin_data'
# and 4 tables: products, orders, supplier_quotes, agent_recommendations
from google.cloud import bigquery
import os

# Replace with your actual GCP project ID
PROJECT_ID = os.environ.get('PROJECT_ID', 'margin-ai-2026')
DATASET_ID = 'margin_data'

client = bigquery.Client(project=PROJECT_ID)

# Create dataset
dataset_ref = bigquery.Dataset(f'{PROJECT_ID}.{DATASET_ID}')
dataset_ref.location = 'US'
try:
    client.create_dataset(dataset_ref)
    print(f'Dataset {DATASET_ID} created')
except Exception as e:
    print(f'Dataset may already exist: {e}')

# Define all 4 table schemas
tables = {
    'products': [
        bigquery.SchemaField('sku_id', 'STRING'),
        bigquery.SchemaField('sku_name', 'STRING'),
        bigquery.SchemaField('category', 'STRING'),
        bigquery.SchemaField('cost_price', 'FLOAT'),
        bigquery.SchemaField('selling_price', 'FLOAT'),
        bigquery.SchemaField('channel', 'STRING'),
        bigquery.SchemaField('channel_fee_pct', 'FLOAT'),
        bigquery.SchemaField('shipping_cost', 'FLOAT'),
    ],
    'orders': [
        bigquery.SchemaField('order_id', 'STRING'),
        bigquery.SchemaField('sku_id', 'STRING'),
        bigquery.SchemaField('channel', 'STRING'),
        bigquery.SchemaField('order_date', 'DATE'),
        bigquery.SchemaField('revenue', 'FLOAT'),
        bigquery.SchemaField('units_sold', 'INTEGER'),
        bigquery.SchemaField('returned', 'BOOLEAN'),
        bigquery.SchemaField('return_reason', 'STRING'),
    ],
    'supplier_quotes': [
        bigquery.SchemaField('sku_id', 'STRING'),
        bigquery.SchemaField('supplier_name', 'STRING'),
        bigquery.SchemaField('unit_cost', 'FLOAT'),
        bigquery.SchemaField('moq', 'INTEGER'),
        bigquery.SchemaField('market_benchmark', 'FLOAT'),
        bigquery.SchemaField('quote_date', 'DATE'),
    ],
    'agent_recommendations': [
        bigquery.SchemaField('agent_name', 'STRING'),
        bigquery.SchemaField('sku_id', 'STRING'),
        bigquery.SchemaField('insight', 'STRING'),
        bigquery.SchemaField('action', 'STRING'),
        bigquery.SchemaField('confidence_pct', 'FLOAT'),
        bigquery.SchemaField('financial_impact', 'STRING'),
        bigquery.SchemaField('created_at', 'TIMESTAMP'),
    ],
}

for table_name, schema in tables.items():
    table_ref = client.dataset(DATASET_ID).table(table_name)
    table = bigquery.Table(table_ref, schema=schema)
    try:
        client.create_table(table)
        print(f'Table {table_name} created')
    except Exception as e:
        print(f'Table {table_name} may exist: {e}')

print('All BigQuery tables ready!')
