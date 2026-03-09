# Phase 1: Dependencies
FROM python:3.9-slim AS builder
WORKDIR /app
COPY apps/live-data-service/requirements.txt ./
# We'll create the requirements.txt first
# For simplicity, I'll just copy it
RUN pip install --user --no-cache-dir fastapi uvicorn

# Phase 2: Runner
FROM python:3.9-slim AS runner
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY apps/live-data-service/main.py ./
ENV PATH=/root/.local/bin:$PATH

EXPOSE 8004
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8004", "--workers", "4"]
