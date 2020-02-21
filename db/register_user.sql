INSERT INTO users (username,password, profile_pic)
VALUES ($1, $2, 'https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg')
RETURNING user_id, username, profile_pic;