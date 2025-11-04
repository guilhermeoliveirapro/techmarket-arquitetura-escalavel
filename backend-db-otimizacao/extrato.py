import sqlite3
from datetime import datetime, timedelta

def inicializar_db():
    conn = sqlite3.connect('techmarket.db')
    cursor = conn.cursor()
    
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS transacoes (
            id INTEGER PRIMARY KEY,
            conta_id TEXT,
            tipo_movimentacao TEXT, -- 'C' (Crédito) ou 'D' (Débito)
            valor REAL,
            data_transacao DATE
        )
    """)
    conn.commit()
    return conn

def gerar_extrato(conn, conta_id, data_inicio, data_fim):
    cursor = conn.cursor()

    cursor.execute("""
        SELECT SUM(CASE 
                        WHEN tipo_movimentacao = 'C' THEN valor 
                        ELSE -valor 
                    END) 
        FROM transacoes
        WHERE conta_id = ? AND data_transacao <= ?
    """, (conta_id, data_fim))
    
    saldo = cursor.fetchone()[0] or 0.0

    cursor.execute("""
        SELECT data_transacao, tipo_movimentacao, valor 
        FROM transacoes 
        WHERE conta_id = ? AND data_transacao >= ? AND data_transacao <= ? 
        ORDER BY data_transacao DESC 
        LIMIT 10
    """, (conta_id, data_inicio, data_fim))
    
    ultimas_transacoes = cursor.fetchall()
    
    return saldo, ultimas_transacoes

if __name__ == "__main__":
    conn = inicializar_db()

    data_hoje = datetime.now().strftime("%Y-%m-%d")
    data_semana_passada = (datetime.now() - timedelta(days=7)).strftime("%Y-%m-%d")

    cursor = conn.cursor()

    cursor.execute("DELETE FROM transacoes") 
    cursor.execute("INSERT INTO transacoes VALUES (NULL, 'A100', 'C', 1000.00, '2025-10-25')")
    cursor.execute("INSERT INTO transacoes VALUES (NULL, 'A100', 'D', 250.00, '2025-10-28')")
    cursor.execute("INSERT INTO transacoes VALUES (NULL, 'A100', 'C', 5000.00, '2025-11-01')")
    cursor.execute("INSERT INTO transacoes VALUES (NULL, 'A100', 'D', 1200.00, '2025-11-02')")
    conn.commit()

    saldo, extrato = gerar_extrato(conn, 'A100', '2025-10-01', data_hoje)

    print("--- Resultado da Execução da Stored Procedure (Simulada) ---")
    print(f"Conta: A100 | Período: 2025-10-01 até {data_hoje}")
    print("-" * 50)
    print(f"SALDO ATUAL NO PERÍODO: R$ {saldo:,.2f}")
    print("-" * 50)
    print("ÚLTIMAS TRANSAÇÕES:")
    for data, tipo, valor in extrato:
        sinal = "+" if tipo == 'C' else "-"
        print(f"  {data} | {tipo} | {sinal}R$ {valor:,.2f}")
    
    conn.close()