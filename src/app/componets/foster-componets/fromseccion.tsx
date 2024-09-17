import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideDown = keyframes`
  from { max-height: 0; }
  to { max-height: 500px; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column; /* Make it column by default */
  max-width: 100%;
  margin: 0 auto;
  padding: 20px; /* Reduced padding for small screens */
  font-family: 'Arial', sans-serif;
  background-color: #FFF0F5;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    flex-direction: row; /* Flex-direction row for larger screens */
    padding: 40px;
  }
`;

const LeftColumn = styled.div`
  width: 100%;
  padding-right: 0; /* Removed padding for small screens */
  margin-bottom: 20px; /* Add margin bottom for separation on small screens */

  @media (min-width: 768px) {
    width: 40%;
    padding-right: 40px;
    margin-bottom: 0;
  }
`;

const RightColumn = styled.div`
  width: 100%;
  padding-left: 0; /* Removed padding for small screens */

  @media (min-width: 768px) {
    width: 60%;
    padding-left: 40px;
  }
`;

const Title = styled.h1`
  font-size: 28px; /* Reduced font size for small screens */
  font-weight: bold;
  margin-bottom: 20px;
  color: #8E4585;

  @media (min-width: 768px) {
    font-size: 36px;
  }
`;

const Subtitle = styled.h2`
  font-size: 22px; /* Reduced font size for small screens */
  font-weight: bold;
  margin-bottom: 20px;
  color: #D8A7B1;

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

const Paragraph = styled.p`
  margin-bottom: 20px; /* Adjusted margin bottom for small screens */
  font-size: 16px; /* Reduced font size for small screens */
  line-height: 1.6;
  color: #6A5ACD;

  @media (min-width: 768px) {
    margin-bottom: 30px;
    font-size: 18px;
  }
`;

const PreFormButton = styled.button`
  background-color: #FF69B4;
  color: white;
  padding: 10px 20px; /* Adjusted padding for small screens */
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 16px; /* Adjusted font size for small screens */
  transition: all 0.3s ease;

  &:hover {
    background-color: #FF1493;
    transform: scale(1.05);
  }

  @media (min-width: 768px) {
    padding: 15px 30px;
    font-size: 18px;
  }
`;

const FAQItem = styled.div`
  margin-bottom: 10px; /* Adjusted margin bottom for small screens */
  animation: ${fadeIn} 0.5s ease-out;
`;

const FAQQuestion = styled.button<{ isOpen: boolean }>`
  width: 100%;
  text-align: left;
  padding: 15px; /* Adjusted padding for small screens */
  background-color: ${props => props.isOpen ? '#E6E6FA' : '#FFC0CB'};
  color: #8E4585;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px; /* Adjusted font size for small screens */
  transition: all 0.3s ease;

  &:hover {
    background-color: #FFB6C1;
  }

  @media (min-width: 768px) {
    font-size: 18px;
    padding: 20px;
  }
`;

const FAQAnswer = styled.div`
  padding: 15px; /* Adjusted padding for small screens */
  background-color: #E6E6FA;
  color: #6A5ACD;
  font-size: 14px; /* Adjusted font size for small screens */
  line-height: 1.6;
  border-radius: 0 0 10px 10px;
  animation: ${slideDown} 0.5s ease-out;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 20px;
    font-size: 16px;
  }
`;

const PlusIcon = styled.span<{ isOpen: boolean }>`
  font-size: 20px; /* Adjusted font size for small screens */
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'rotate(45deg)' : 'rotate(0)'};

  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

const AdoptionFAQ: React.FC = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const handleFormClick = () => {
    window.open('https://forms.gle/5PeAXJf1DJncbojr7', '_blank');
  };

  const faqs = [
    {
      question: "What is the process to adopt an animal from the foundation?",
      answer: "We have a large number of applications and limited human resources for processing them, so we ask for your patience and respect. Please read the information provided carefully to begin the adoption process.\n\n1. Choose the puppy or kitten you wish to adopt, considering the space you have, your age, and size.\n2. Complete the Training Form. The entered data will be verified by Foundation officials (this verification takes 3 calendar days). If you do not continue in the process, we will send you an email informing you.\n3. If your form is approved, we will call you to provide instructions on how to record a video of the place where the pet will live and send it to us, as we cannot do the home visit due to Coronavirus.\n4. We will review your application and, if everything is in order, we will contact you to coordinate the day when the pet you chose will arrive at your home."
    },
    {
      question: "What are the benefits of adopting?",
      answer: "Adoption provides companionship, improves mental health, saves a life, and creates space for other animals in shelters."
    },
    {
      question: "Why adopt instead of buying?",
      answer: "Adoption saves lives, reduces overpopulation, is more cost-effective, and helps fight against puppy mills."
    },
    {
      question: "What are the responsibilities of an adopter?",
      answer: "Providing food, shelter, medical care, exercise, training, and love. Ensuring the pet is spayed/neutered and microchipped."
    },
    {
      question: "What special care should be taken?",
      answer: "Regular vet check-ups, proper diet, exercise, grooming, and attention to any breed-specific needs."
    },
    {
      question: "How many animals have been given for adoption?",
      answer: "Our foundation has successfully placed over 1000 animals in loving homes in the past year."
    },
  ];

  return (
    <Container>
      <LeftColumn>
        <Title>ARE YOU READY?</Title>
        <Subtitle>BEFORE APPLYING</Subtitle>
        <Paragraph>
          If you are interested in adopting one of our furry friends, before filling out the training form, you must carefully read each of the following frequently asked questions:
        </Paragraph>
        <PreFormButton onClick={handleFormClick}>
          TRAINING FORM
        </PreFormButton>
      </LeftColumn>
      <RightColumn>
        <Subtitle>FREQUENTLY ASKED QUESTIONS ABOUT ADOPTION</Subtitle>
        {faqs.map((faq, index) => (
          <FAQItem key={index}>
            <FAQQuestion
              isOpen={openQuestion === index}
              onClick={() => toggleQuestion(index)}
            >
              <span>{faq.question}</span>
              <PlusIcon isOpen={openQuestion === index}>+</PlusIcon>
            </FAQQuestion>
            {openQuestion === index && (
              <FAQAnswer>
                {faq.answer}
              </FAQAnswer>
            )}
          </FAQItem>
        ))}
      </RightColumn>
    </Container>
  );
};

export default AdoptionFAQ;
