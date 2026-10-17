# File: agents/adk_orchestrator/main.py
# Flask HTTP wrapper — Cloud Run triggers the full pipeline via POST /run.
# Imports each agent module directly (faster than subprocess, no path guessing).
import sys
import os
from flask import Flask, jsonify

app = Flask(__name__)

# Add /app to sys.path so agent modules can be imported directly.
# In Docker: /app/source_sense/agent.py etc.
# Locally: resolved relative to this file's parent (agents/).
AGENTS_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if AGENTS_DIR not in sys.path:
    sys.path.insert(0, AGENTS_DIR)

def _run(module_path: str, label: str) -> str:
    """Import and call run_agent() from the given dotted module path."""
    try:
        import importlib
        mod = importlib.import_module(module_path)
        mod.run_agent()
        print(f'{label} completed successfully')
        return 'success'
    except Exception as exc:
        print(f'{label} failed: {exc}')
        return f'failed: {exc}'

# Pipeline order matters — LaunchRadar reads sku_margins written by MarginMap.
PIPELINE = [
    ('source_sense.agent', 'SourceSense'),
    ('margin_map.agent',   'MarginMap'),
    ('return_iq.agent',    'ReturnIQ'),
    ('launch_radar.agent', 'LaunchRadar'),
]

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'agents': [label for _, label in PIPELINE]})

@app.route('/run', methods=['POST', 'GET'])
def run_pipeline():
    results = {}
    for module_path, label in PIPELINE:
        status = _run(module_path, label)
        results[label] = status
        if status != 'success':
            break
    return jsonify({'pipeline': results, 'status': 'completed'})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)
