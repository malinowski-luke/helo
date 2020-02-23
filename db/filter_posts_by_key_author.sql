SELECT * FROM posts
WHERE title like $1 and author_id = $2;