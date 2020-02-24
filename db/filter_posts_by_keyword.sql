SELECT * FROM posts
WHERE title like $1 --OR content like $1;
ORDER BY post_id DESC;