# File: agents/adk_orchestrator/orchestrator.py
# What this does: Uses Google ADK to run all 4 agents in sequence.
# Each agent runs only after the previous one completes successfully.
# Think of it like a pipeline: water flows through each stage in order.
import subprocess
import sys
import os
from datetime import datetime

# ADK import — install with: pip install google-adk
try:
    from google.adk.agents import SequentialAgent, PythonScriptAgent
    USE_ADK = True
except ImportError:
    USE_ADK = False
    print('ADK not installed — using sequential subprocess fallback')

AGENTS_DIR = os.path.join(os.path.dirname(__file__), '..')

# ── Agent execution wrapper ────────────────────────────────────────────────────
def run_agent(agent_name: str, script_path: str) -> bool:
    '''Runs a Python agent script and returns True if successful.'''
    print(f"\n{'='*60}")
    print(f"Running {agent_name} at {datetime.utcnow().isoformat()}")
    print(f"{'='*60}")
    result = subprocess.run(
        [sys.executable, script_path],
        env=os.environ.copy(),
        capture_output=False,
    )
    if result.returncode == 0:
        print(f'{agent_name} COMPLETED SUCCESSFULLY')
        return True
    else:
        print(f'{agent_name} FAILED with exit code {result.returncode}')
        return False

# ── Agent pipeline definition ─────────────────────────────────────────────────
# Order matters! LaunchRadar reads MarginMap output, so MarginMap must run first.
PIPELINE = [
    ('SourceSense',  os.path.join(AGENTS_DIR, 'source_sense/agent.py')),
    ('MarginMap',    os.path.join(AGENTS_DIR, 'margin_map/agent.py')),
    ('ReturnIQ',     os.path.join(AGENTS_DIR, 'return_iq/agent.py')),
    ('LaunchRadar',  os.path.join(AGENTS_DIR, 'launch_radar/agent.py')),
]

def execute_pipeline():
    print(f'Margin AI Orchestrator starting at {datetime.utcnow().isoformat()}')
    print(f'Running {len(PIPELINE)} agents in sequence...')
    results = {}
    for agent_name, script_path in PIPELINE:
        success = run_agent(agent_name, script_path)
        results[agent_name] = 'SUCCESS' if success else 'FAILED'
        if not success:
            print(f'Pipeline stopped at {agent_name}. Fix errors before continuing.')
            break

    print('\n' + '='*60)
    print('ORCHESTRATION COMPLETE — SUMMARY:')
    for agent, status in results.items():
        icon = '✓' if status == 'SUCCESS' else '✗'
        print(f'  {icon} {agent}: {status}')
    print('='*60)
    return results

if __name__ == '__main__':
    execute_pipeline()
