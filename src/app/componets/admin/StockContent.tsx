'use client';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineHeart, AiOutlineMessage, AiOutlineSend, AiOutlineBook, AiOutlineMore, AiOutlinePlusCircle } from 'react-icons/ai';
import ReactAvatar from 'react-avatar';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto; /* Sin margin superior */
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  position: relative;
`;

const StoriesContainer = styled.div`
  overflow-x: auto;
  white-space: nowrap;
  padding: 12px 16px;
  border-bottom: 1px solid #dbdbdb;
`;

const StoryWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
  cursor: pointer;
`;

const AvatarWrapper = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #e1306c;
`;

const Username = styled.span`
  font-size: 14px;
  margin-top: 4px;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
`;

const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
`;

const PostImage = styled.img`
  width: 100%;
  height: auto;
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 16px;
`;

const PostContent = styled.div`
  padding: 0 16px 16px;
`;

const CommentSection = styled.div`
  padding: 0 16px;
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
`;

const Comment = styled.p`
  font-size: 14px;
  margin: 4px 0;
`;

const LikeCount = styled.span`
  font-size: 14px;
  margin-left: -8px;
`;

const AddImageButton = styled.label`
  position: absolute;
  top: 50px; /* Ajustar según el espacio que desees desde la parte superior */
  right: 16px;
  cursor: pointer;
`;

interface Story {
  id: number;
  username: string;
  imageUrl: string;
}

const initialStories: Story[] = [
  { id: 1, username: 'Your story', imageUrl: '/icons/catfond.jpg' },
  { id: 2, username: 'Candid', imageUrl: '/icons/catfond.jpg' },
  { id: 3, username: 'sprinkles_k', imageUrl: '/icons/catfond.jpg' },
  { id: 4, username: 'super_sami', imageUrl: '/icons/catfond.jpg' },
  { id: 5, username: 'jaded_emi', imageUrl: '/icons/catfond.jpg' },
];

const InstagramPost: React.FC = () => {
  const [posts, setPosts] = useState<Story[]>(() => {
    const savedPosts = localStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const [comments, setComments] = useState<{ [key: number]: string[] }>({});
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPost: Story = {
          id: posts.length + 1,
          username: 'princess_peace',
          imageUrl: reader.result as string,
        };
        setPosts((prevPosts) => {
          const updatedPosts = [...prevPosts, newPost];
          localStorage.setItem('posts', JSON.stringify(updatedPosts));
          return updatedPosts;
        });
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleLike = (postId: number) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: (prevLikes[postId] || 0) + 1,
    }));
  };

  const handleCommentChange = (postId: number, value: string) => {
    setNewComment((prev) => ({
      ...prev,
      [postId]: value,
    }));
  };

  const handleCommentSubmit = (postId: number) => {
    if (newComment[postId]) {
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: [...(prevComments[postId] || []), newComment[postId]],
      }));
      setNewComment((prev) => ({
        ...prev,
        [postId]: '',
      }));
      // Guardar comentarios en localStorage
      localStorage.setItem('comments', JSON.stringify({
        ...comments,
        [postId]: [...(comments[postId] || []), newComment[postId]],
      }));
    }
  };

  useEffect(() => {
    const savedComments = localStorage.getItem('comments');
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  return (
    <Container>
      <AddImageButton htmlFor="imageUpload">
        <AiOutlinePlusCircle size={30} color="#e1306c" />
      </AddImageButton>
      <input 
        type="file" 
        accept="image/*" 
        style={{ display: 'none' }} 
        id="imageUpload" 
        onChange={handleImageUpload}
      />
      <StoriesContainer>
        {initialStories.map((story) => (
          <StoryWrapper key={story.id}>
            <AvatarWrapper>
              <ReactAvatar name={story.username} size="64" round={true} />
            </AvatarWrapper>
            <Username>{story.username}</Username>
          </StoryWrapper>
        ))}
      </StoriesContainer>

      {posts.map((post) => (
        <div key={post.id}>
          <PostHeader>
            <ProfileImage src={post.imageUrl} alt="Profile" />
            <Username style={{ fontSize: '16px', fontWeight: '600' }}>{post.username}</Username>
            <AiOutlineMore color="black" size={24} style={{ marginLeft: 'auto', cursor: 'pointer' }} />
          </PostHeader>
          <PostImage src={post.imageUrl} alt="Post image" />
          <ActionsContainer>
            <ActionGroup>
              <AiOutlineHeart size={28} onClick={() => handleLike(post.id)} style={{ cursor: 'pointer' }} />
              {likes[post.id] > 0 && <LikeCount>{likes[post.id]}</LikeCount>}
              <AiOutlineMessage size={28} />
              <AiOutlineSend size={28} />
            </ActionGroup>
            <AiOutlineBook size={28} />
          </ActionsContainer>
          <PostContent>
            <p style={{ fontWeight: '600', marginBottom: '8px' }}>Liked by kyla_kayaks and others</p>
            <p>
              <span style={{ fontWeight: '600' }}>princess_peace</span> Sunday sunshine.
              <span style={{ color: '#00376b' }}> #weekendvibes</span>
            </p>
          </PostContent>

          <CommentSection>
            {comments[post.id] && comments[post.id].map((comment, index) => (
              <Comment key={index}>
                <span style={{ fontWeight: '600' }}>{post.username}</span> {comment}
              </Comment>
            ))}
            <CommentInput
              type="text"
              placeholder="Add a comment..."
              value={newComment[post.id] || ''}
              onChange={(e) => handleCommentChange(post.id, e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleCommentSubmit(post.id);
                }
              }}
            />
          </CommentSection>
        </div>
      ))}
    </Container>
  );
};

export default InstagramPost;
