SELECT p.post_id, p.title, p.img, p.content, u.username, u.profile_pic
FROM posts p JOIN users u ON u.user_id = p.author_id
WHERE p.author_id = $1
ORDER BY p.post_id DESC;