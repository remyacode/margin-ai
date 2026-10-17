FROM python:3.11-slim
WORKDIR /app
# Copy requirements and install them first (Docker caches this layer)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# Copy the agent code
COPY agent.py .
# Run the agent when the container starts
CMD ["python", "agent.py"]
