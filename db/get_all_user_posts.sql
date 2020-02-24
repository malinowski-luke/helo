SELECT p.post_id, p.title, p.img, p.content, u.username, u.profile_pic
FROM posts p JOIN users u ON u.user_id = p.author_id
ORDER BY p.post_id DESC;