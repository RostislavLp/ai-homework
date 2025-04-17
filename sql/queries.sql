-- 1 Total sales in March 2024
SELECT SUM(amount) AS total_sales_march_2024
FROM orders
WHERE order_date >= '2024-03-01' AND order_date < '2024-04-01';

-- 2 Customer who spent the most money in March 2024
SELECT customer, SUM(amount) AS total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC
LIMIT 1;

-- 3. Average order value for the last three months
SELECT AVG(amount) AS average_order_value_last_3_months
FROM orders
WHERE order_date >= date('now', 'start of month', '-3 months')
  AND order_date < date('now', 'start of month');

