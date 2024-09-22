import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineHeart, AiOutlineMessage, AiOutlineSend, AiOutlineBook, AiOutlineClose, AiOutlineMore, AiOutlinePlusCircle } from 'react-icons/ai';
import ReactAvatar from 'react-avatar';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
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

const LikeCount = styled.span`
  font-size: 14px;
  margin-left: -8px;
`;

const StoryViewerContainer = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  backdrop-filter: blur(5px);
`;

const StoryContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
`;

const StoryOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
`;

const StoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StoryUser = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StoryUsername = styled.span`
  color: white;
  font-weight: 600;
`;

const StoryActions = styled.div`
  display: flex;
  gap: 16px;
`;

const StoryCentralContent = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StoryImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px;
`;

const StoryBottom = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const StoryBottomItem = styled.div`
  width: 80px;
  height: 32px;
  background-color: white;
  border-radius: 16px;
`;

const ProgressBar = styled.div<{ width: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background-color: #e1306c;
  width: ${({ width }) => width}%;
  transition: width 0.1s;
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

interface StoryViewerProps {
  story: Story;
  onClose: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ story, onClose }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onClose();
          return 100;
        }
        return prev + 1; // Aumenta el progreso
      });
    }, 100); // Ajusta la velocidad de la barra

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, [onClose]);

  return (
    <StoryViewerContainer>
      <StoryContent>
        <StoryOverlay>
          <StoryHeader>
            <StoryUser>
              <ReactAvatar name={story.username} size="32" round={true} />
              <StoryUsername>{story.username}</StoryUsername>
            </StoryUser>
            <StoryActions>
              <AiOutlineClose color="white" size={24} onClick={onClose} style={{ cursor: 'pointer' }} />
            </StoryActions>
          </StoryHeader>
          <StoryCentralContent>
            <StoryImage src={story.imageUrl} alt={`${story.username}'s story`} />
          </StoryCentralContent>
          <StoryBottom>
            <StoryBottomItem />
            <StoryBottomItem />
          </StoryBottom>
        </StoryOverlay>
        <ProgressBar width={progress} />
      </StoryContent>
    </StoryViewerContainer>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const CloseButton = styled.button`
  margin-top: 10px;
`;

const SessionModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <ModalContainer>
    <ModalContent>
      <h2>¡Debes iniciar sesión!</h2>
      <p>Por favor, inicia sesión para continuar.</p>
      <CloseButton onClick={onClose}>Cerrar</CloseButton>
    </ModalContent>
  </ModalContainer>
);

export default function InstagramPost() {
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [posts, setPosts] = useState<Story[]>([]);
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal

  const addPost = (imageUrl: string) => {
    const newPost: Story = {
      id: posts.length + 1,
      username: 'princess_peace',
      imageUrl,
    };
    setPosts((prevPosts) => [...prevPosts, newPost]);
    setLikes((prevLikes) => ({ ...prevLikes, [newPost.id]: 0 }));
  };

  const burnExamplePosts = () => {
    const exampleUrls = [
      'https://s1.elespanol.com/2022/04/05/actualidad/662693884_223269248_1024x576.jpg',
      'https://as01.epimg.net/diarioas/imagenes/2022/05/29/actualidad/1653826510_995351_1653826595_noticia_normal.jpg',
      'https://c.files.bbci.co.uk/48DD/production/_107435681_perro1.jpg',
    ];

    exampleUrls.forEach(url => addPost(url));
  };

  useEffect(() => {
    burnExamplePosts();
  }, []);

  const handleLike = (postId: number) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: (prevLikes[postId] || 0) + 1,
    }));
  };

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleImageInput = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const imageUrl = prompt('Introduce la URL de la nueva imagen:');
      if (imageUrl && isValidUrl(imageUrl)) {
        addPost(imageUrl);
      } else {
        alert('Por favor, introduce una URL válida.');
      }
    } else {
      setShowModal(true); // Mostrar modal si no hay token
    }
  };

  return (
    <Container>
      <StoriesContainer>
        {initialStories.map((story) => (
          <StoryWrapper key={story.id} onClick={() => setActiveStory(story)}>
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
            <AiOutlineBook size={28} /> {/* Cambiado aquí */}
          </ActionsContainer>
          <PostContent>
            <p style={{ fontWeight: '600', marginBottom: '8px' }}>Liked by kyla_kayaks and others</p>
            <p>
              <span style={{ fontWeight: '600' }}>princess_peace</span> Sunday sunshine.
              <span style={{ color: '#00376b' }}> #weekendvibes</span>
            </p>
          </PostContent>
        </div>
      ))}

      {activeStory && (
        <StoryViewer story={activeStory} onClose={() => setActiveStory(null)} />
      )}

      <AiOutlinePlusCircle 
        size={60} 
        color="#e1306c" 
        style={{ position: 'absolute', bottom: '16px', right: '16px', cursor: 'pointer' }} 
        onClick={handleImageInput}
      />

      {showModal && <SessionModal onClose={() => setShowModal(false)} />}
    </Container>
  );
}
