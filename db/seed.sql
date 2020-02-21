CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(20),
    password VARCHAR(50),
    profile_pic TEXT
);

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    img TEXT,
    content TEXT,
    author_id INT REFERENCES users(user_id)
);

-- dummy data for username: luke, password: test
INSERT INTO posts (title, img, content, author_id)
VALUES ('post 1',null,'this is the post text1',1),
('post 2',null,'this is the post text2',1),
('post 3',null,'this is the post text3',1);