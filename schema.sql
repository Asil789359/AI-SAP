-- Core ERP Schema (MVP)

-- 1. Finance (FI) Module
CREATE TABLE general_ledger (
    id SERIAL PRIMARY KEY,
    account_code VARCHAR(20) UNIQUE NOT NULL,
    account_name VARCHAR(100) NOT NULL,
    balance DECIMAL(15, 2) DEFAULT 0.00,
    type VARCHAR(20) CHECK (type IN ('Asset', 'Liability', 'Equity', 'Revenue', 'Expense')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE journal_entries (
    id SERIAL PRIMARY KEY,
    entry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    reference_no VARCHAR(50),
    created_by INT
);

CREATE TABLE ledger_lines (
    id SERIAL PRIMARY KEY,
    entry_id INT REFERENCES journal_entries(id),
    account_id INT REFERENCES general_ledger(id),
    debit DECIMAL(15, 2) DEFAULT 0.00,
    credit DECIMAL(15, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Sales (O2C) Module
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sales_orders (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(15, 2) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Draft', 'Confirmed', 'Processing', 'Invoiced', 'Paid', 'Cancelled')),
    shipping_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Inventory Module
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(12, 2) NOT NULL,
    cost DECIMAL(12, 2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    min_stock_level INT DEFAULT 10,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stock_movements (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    quantity INT NOT NULL,
    movement_type VARCHAR(20) CHECK (movement_type IN ('IN', 'OUT', 'ADJUSTMENT')),
    reference_id INT, -- Cross-reference to Sales Order or Purchase Order
    movement_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
