# ── BUILD CONTEXT NOTE ────────────────────────────────────────────────────────
# This Dockerfile must be built from the agents/ directory (one level up),
# not from agents/adk_orchestrator/, because it COPYs sibling agent folders.
#
# Deploy command (run from repo root):
#   gcloud run deploy margin-orchestrator \
#     --source agents \
#     --region asia-southeast1 \
#     --platform managed \
#     --allow-unauthenticated \
#     --set-env-vars PROJECT_ID=margin-ai-2026 \
#     --set-secrets SUPABASE_URL=supabase-url:latest,SUPABASE_KEY=supabase-key:latest \
#     --project margin-ai-2026
# ─────────────────────────────────────────────────────────────────────────────
FROM python:3.11-slim
WORKDIR /app

# Install dependencies from orchestrator requirements
COPY adk_orchestrator/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install dependencies for all 4 agents (they share the same packages)
COPY margin_map/requirements.txt /tmp/req_mm.txt
RUN pip install --no-cache-dir -r /tmp/req_mm.txt

# Copy all agent code into /app so paths resolve correctly
COPY source_sense/  /app/source_sense/
COPY margin_map/    /app/margin_map/
COPY return_iq/     /app/return_iq/
COPY launch_radar/  /app/launch_radar/
COPY adk_orchestrator/ /app/

ENV PORT=8080
CMD ["python", "main.py"]
