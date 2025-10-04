import json
from datetime import datetime, timedelta
from linkup import LinkupClient
import clickhouse_connect
from dateutil import parser  # <-- new import for safe date parsing

# ✅ Step 1: Connect to ClickHouse
try:
    client_db = clickhouse_connect.get_client(
        host='g27hemtgny.us-east-2.aws.clickhouse.cloud',
        user='default',
        password='_i3N1hz7xEwPG',
        secure=True
    )
    print("✅ Connected to ClickHouse")
except Exception as e:
    print("❌ Could not connect to ClickHouse:", e)
    exit()

# ✅ Step 2: Create table if not exists
client_db.command("""
CREATE TABLE IF NOT EXISTS banking_news (
    period String,
    company String,
    metric String,
    summary String,
    title String,
    source String,
    date DateTime,
    link String
) ENGINE = MergeTree()
ORDER BY (company, period, metric)
""")

# ✅ Step 3: Setup Linkup client
client = LinkupClient(api_key="e1ae2aff-0e02-467a-8e43-450aa8e39c89")

industry = "Banking"
companies = ["Bank of America"]
metrics = [
    "earnings", "restructuring", "layoffs", "digital transformation",
    "fintech partnership", "compliance", "SEC investigation",
    "AI adoption", "sustainability", "ESG bond"
]
periods = {"last_week": 7}

credible_sources = [
    "wsj.com", "ft.com", "reuters.com", "bloomberg.com", "cnbc.com",
    "nytimes.com", "theguardian.com", "forbes.com", "businessinsider.com", "financialtimes.com"
]

def get_date_range(days_back):
    end = datetime.now()
    start = end - timedelta(days=days_back)
    return start, end

rows_to_insert = []

for period_name, days_back in periods.items():
    start_date, end_date = get_date_range(days_back)

    for company in companies:
        for metric in metrics:
            query_payload = {"industry": industry, "company": company, "metric": metric}
            query_str = json.dumps(query_payload)

            response = client.search(
                query=query_str,
                depth="standard",
                output_type="sourcedAnswer",
                include_images=False,
                include_domains=credible_sources,
                from_date=start_date,
                to_date=end_date,
                include_inline_citations=False
            )

            summary = getattr(response, "answer", "").replace("\n", " ")

            if hasattr(response, "sources") and response.sources:
                for src in response.sources[:10]:
                    raw_date = getattr(src, "published_at", None)
                    
                    # ✅ Safely parse to datetime (fallback to now if missing)
                    try:
                        parsed_date = parser.parse(raw_date) if raw_date else datetime.now()
                    except Exception:
                        parsed_date = datetime.now()

                    rows_to_insert.append((
                        period_name,
                        company,
                        metric,
                        summary,
                        getattr(src, "title", ""),
                        getattr(src, "url", ""),
                        parsed_date,  # ✅ now a proper datetime object
                        getattr(src, "url", "")
                    ))

# ✅ Step 4: Insert into ClickHouse
if rows_to_insert:
    client_db.insert(
        table="banking_news",
        data=rows_to_insert,
        column_names=["period", "company", "metric", "summary", "title", "source", "date", "link"]
    )
    print(f"✅ Inserted {len(rows_to_insert)} rows into ClickHouse table 'banking_news'")
else:
    print("⚠️ No rows to insert — check if your Linkup query returned data.")
