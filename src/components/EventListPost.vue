<template>
    <div class="discussion-wall">
      <div class="info-container">
        <div class="line"></div>
        <span class="info-text">Messages</span>
        <div class="line"></div>
      </div>  
      <!-- Liste des discussions -->
      <div class="discussion-list">
        <div v-for="(discussion, index) in listPost.listPost" :key="index" class="discussion-card">
          <div v-if="discussion.discussionCount > 0" class="counter">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 19.8823C11.4969 19.8823 11.0229 19.6271 10.6875 19.1823L9.59376 17.724C9.57188 17.6948 9.48439 17.6583 9.44793 17.651H9.08334C6.04272 17.651 4.16147 16.8271 4.16147 12.7292V9.08334C4.16147 5.86042 5.86043 4.16146 9.08334 4.16146H14.9167C18.1396 4.16146 19.8386 5.86042 19.8386 9.08334V12.7292C19.8386 15.9521 18.1396 17.651 14.9167 17.651H14.5521C14.4938 17.651 14.4427 17.6802 14.4063 17.724L13.3125 19.1823C12.9771 19.6271 12.5031 19.8823 12 19.8823ZM9.08334 5.25521C6.47293 5.25521 5.25522 6.47292 5.25522 9.08334V12.7292C5.25522 16.025 6.38543 16.5573 9.08334 16.5573H9.44793C9.8198 16.5573 10.2427 16.7688 10.4688 17.0677L11.5625 18.526C11.8177 18.8615 12.1823 18.8615 12.4375 18.526L13.5313 17.0677C13.7719 16.7469 14.1511 16.5573 14.5521 16.5573H14.9167C17.5271 16.5573 18.7448 15.3396 18.7448 12.7292V9.08334C18.7448 6.47292 17.5271 5.25521 14.9167 5.25521H9.08334Z" fill="#ffffff"/>
              <path d="M15.6459 9.63021H8.35422C8.05526 9.63021 7.80734 9.38229 7.80734 9.08334C7.80734 8.78438 8.05526 8.53646 8.35422 8.53646H15.6459C15.9448 8.53646 16.1928 8.78438 16.1928 9.08334C16.1928 9.38229 15.9448 9.63021 15.6459 9.63021Z" fill="#ffffff"/>
              <path d="M12.7292 13.276H8.35422C8.05526 13.276 7.80734 13.0281 7.80734 12.7292C7.80734 12.4302 8.05526 12.1823 8.35422 12.1823H12.7292C13.0282 12.1823 13.2761 12.4302 13.2761 12.7292C13.2761 13.0281 13.0282 13.276 12.7292 13.276Z" fill="#ffffff"/>
            </svg>
            {{ discussion.discussionCount }}
          </div>
          <div class="discussion-header">
            <span class="author">{{ discussion.creatorName }}</span>
          </div>
          <div class="discussion-content">
            <p>{{ discussion.topic }}</p>
            <span class="date">{{ formatDate(discussion.createdAt) }}</span>
          </div>
          <div class="actions">
            <button class="reply-button" @click="findDiscussion(discussion.eventId, discussion.id)">Répondre</button>
          </div>
        </div>
      </div>
      <div class="padding-bottom"></div>

      <!-- Formulaire de publication -->
      <div class="post-form">
        <form @submit="createPost">
          <textarea placeholder="Votre message"  v-model="topic"></textarea>
  
          <button type="submit" id="submit">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.48 18.42C12.6933 18.42 11.58 17.8667 10.7 15.22L10.22 13.78L8.78 13.3C6.14 12.42 5.58667 11.3067 5.58667 10.52C5.58667 9.74 6.14 8.62 8.78 7.73334L14.44 5.84667C15.8533 5.37334 17.0333 5.51333 17.76 6.23333C18.4867 6.95334 18.6267 8.14 18.1533 9.55333L16.2667 15.2133C15.38 17.8667 14.2667 18.42 13.48 18.42ZM9.09334 8.68667C7.24 9.30667 6.58 10.04 6.58 10.52C6.58 11 7.24 11.7333 9.09334 12.3467L10.7733 12.9067C10.92 12.9533 11.04 13.0733 11.0867 13.22L11.6467 14.9C12.26 16.7533 13 17.4133 13.48 17.4133C13.96 17.4133 14.6933 16.7533 15.3133 14.9L17.2 9.24C17.54 8.21334 17.48 7.37334 17.0467 6.94C16.6133 6.50667 15.7733 6.45334 14.7533 6.79334L9.09334 8.68667Z" fill="#ffffff"/>
              <path d="M10.74 13.6C10.6133 13.6 10.4867 13.5533 10.3867 13.4533C10.1933 13.26 10.1933 12.94 10.3867 12.7467L12.7733 10.3533C12.9667 10.16 13.2867 10.16 13.48 10.3533C13.6733 10.5467 13.6733 10.8667 13.48 11.06L11.0933 13.4533C11 13.5533 10.8667 13.6 10.74 13.6Z" fill="#ffffff"/>
            </svg>
          </button>
        </form>
      </div>


    </div>
  </template>
  
  <script setup >
    import { ref, onMounted, onUnmounted, defineProps } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useUserStore } from '../stores/userStore';

    const router = useRouter();
    const route = useRoute();
    const loading = ref(true);
    const error = ref(null);
    const listPost = ref({});
    const userStore = useUserStore();
    const topic = ref('');
    let socket;


    defineProps({
      id: String,
      postId: String
    });
    const API_URL = import.meta.env.DEV  
    ? `${window.location.protocol}//${window.location.hostname}:3000`
    : import.meta.env.VITE_API_URL;
    
    const rawUrl = API_URL.replace(/^https?:\/\//, '');


    const findDiscussion = (eventId, postId) => {
      router.push({ name: 'DiscussionDetails', params: { id: eventId, postId: postId } });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    const createPost = async () => {
      try {        

        const response = await fetch(`${API_URL}/api/events/${route.params.id}/messaging/${userStore.token}/createPost`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            topic: topic.value,
          }),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la mise à jour");
        }

        const data = await response.json();

        console.log("Post créé avec succès:", data);

      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    const fetchListPosts = async () => {
        try {
            let apiUrl = `${API_URL}/api/events/${route.params.id}/messaging/listPost`;
            
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Erreur HTTP');
            }
            listPost.value = await response.json();            
            
        } catch (err) {
            error.value = 'Erreur lors de la récupération des détails de l\'événement.';
            console.error(err);
        } finally {
            loading.value = false;
        }
    };
    
    onMounted(() => {
      // Connexion au WebSocket
      console.log(listPost);
      
      socket = new WebSocket(`${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${rawUrl}`);
      socket.onopen = () => {
        console.log('Connected to WebSocket server');
      };
      socket.onerror = (error) => {
        console.error('WebSocket Error: ', error);
      };
      // Écouter les messages du serveur
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        
        if (message.type === 'NEW_POST') {
          listPost.value.listPost.push(message.data);
        }

        if (message.type === 'NEW_DISCUSSION') {
          const post = listPost.value.listPost.find(post => post.id === parseInt(message.postId));
          if (post) {
            post.discussionCount = message.discussionCount;
          }
          console.log(message);
          
        }

      };

      fetchListPosts();
    });

    onUnmounted(() => {
      if (socket) {
        socket.close();
      }
    });
  </script>
  
  
  <style scoped>
  .discussion-wall {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .info-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
  }

  .line {
    flex: 1;
    height: 1px;
    background-color: #ebedf2;
  }

  .info-text {
    font-family: 'General sans';
    font-size: 14px;
    color: #a8acb7; 
    font-weight: 500;
  }

  .post-form {
    position: fixed;
    bottom: 63px;
    height: auto;
    left: 50%;
    transform: translateX(-50%);
    width: 96dvw;
  }

  textarea {
    width: calc(96dvw - 67px);
    height: 14px;
    padding: 15px 52px 15px 15px;
    border: none;
    background-color: rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(52px);
    border-radius: 4px;
    color: #000000;
    font-family: 'Switzer';
    font-size: 16px;
    font-weight: 400;
    overflow: hidden;
    transition: height 0.3s ease-in-out;
  }

  textarea:focus-visible {
    outline: 1px solid #A8ACB7;
    height: 70px;
  }

  textarea::placeholder {
    color: #c7c9d7;
    font-family: 'Switzer';
    font-size: 16px;
    font-weight: 400;
  }

  #submit {
    position: absolute;
    background-color: black;
    color: white;
    border: none;
    border-radius: 4px;
    height: 32px;
    width: 32px;
    cursor: pointer;
    right: 10px;
    bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px;
  } 

  .discussion-list {
    display: flex;
    flex-direction: column;
    width: 100dvw;
    height: auto;
    max-height: 100%;
    align-items: center;
    margin-top: 20px;
  }

  .discussion-card {
    border: 1px solid #ebedf2;
    padding: 15px 20px 20px 20px;
    border-radius: 4px;
    margin-top: 15px;
    background-color: #ffffff;
    width: calc(75dvw - 40px);
    position: relative;
  }

  .counter {
    background-color: #131313;
    height: 25px;
    width: 45px;
    padding: 0px 2px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    font-family: 'General sans';
    font-size: 14px;
    font-weight: 500;
    gap: 3px;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate( 30%, -50%);
  }

  .discussion-header {
    font-family: 'Switzer';
    font-size: 14px;
    font-weight: 600;
    color: #a8acb7;
    margin-bottom: 5px;
  }

  .discussion-content p {
    margin: 10px 0;
    font-family: 'Switzer';
    font-size: 16px;
    font-weight: 500;
    color: #1a1a39;
  }

  .date {
    font-family: 'Switzer';
    font-size: 14px;
    font-weight: 600;
    color: #a8acb7;
  }

  .reply-button {
    background-color: #ffffff;
    color: black;
    border: 1px solid #ebedf2;
    height: 30px;
    width: 100%;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
    font-family: 'Switzer';
    font-size: 12px;
    font-weight: 400;
    color: #a8acb7;
  }

  .padding-bottom {
    min-height: 250px;
    width: 100%;
    background-color: transparent;
  }

  </style>
  