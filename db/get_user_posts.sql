SELECT * FROM posts
WHERE author_id = $1
ORDER BY post_id DESC;