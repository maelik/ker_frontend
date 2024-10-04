<template>
    <div class="discussion-details">
      <button @click="goBack" class="back-button">← Revenir au mur de discussion</button>
  
      <div class="main-post" v-if="listDiscussion.post">
        <p class="author">{{ listDiscussion.post.creatorName }}</p>
        <p class="content">{{ listDiscussion.post.topic }}</p>
        <p class="date">{{ formatDate(listDiscussion.post.createdAt) }}</p>
      </div>
  
      <div v-for="(response, index) in listDiscussion.listDiscussion" :key="index" class="response-card">
        <div class="response-header">
          <span class="author">{{ response.writorName }}</span>
        </div>
        <div class="response-content">
          <p>{{ response.messageText }}</p>
          <span class="date">{{ formatDate(response.createdAt) }}</span>
        </div>
      </div>
  
      <div class="reply-form">
        <form  @submit="createMessage">
          <textarea v-model="newResponseText" placeholder="Répondre"></textarea>
          <button type="submit">➔ Poster</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup >
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useUserStore } from '../stores/userStore';

    const route = useRoute();
    const router = useRouter();
    const newResponseText = ref('');
    const listDiscussion = ref({});
    const loading = ref(true);
    const error = ref(null);
    const userStore = useUserStore();

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    const createMessage = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/${route.params.id}/messaging/${userStore.token}/post/${route.params.postId}/createDiscussion`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messageText: newResponseText.value,
          }),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la mise à jour");
        }

        const data = await response.json();

        console.log("Message créé avec succès:", data);

      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    const goBack = () => {
      router.push({name:'EventListPost'}); // Retour à la liste des discussions
    };

    const fetchListDiscussion = async () => {
          try {
              let apiUrl = `${import.meta.env.VITE_API_URL}/api/events/${route.params.id}/messaging/post/${route.params.postId}/listDiscussion`;
              
              const response = await fetch(apiUrl);
              if (!response.ok) {
                  throw new Error('Erreur HTTP');
              }
              listDiscussion.value = await response.json();
              
          } catch (err) {
              error.value = 'Erreur lors de la récupération des détails de l\'événement.';
              console.error(err);
          } finally {
              loading.value = false;
          }
      };
        
      onMounted(() => {
        fetchListDiscussion();
      });

  </script>
  
  <style scoped>
   .response-card {
    border: 1px solid #e0e0e0;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
    }

    .response-header {
    font-weight: bold;
    margin-bottom: 5px;
    }

    .response-content p {
    margin: 10px 0;
    }

    .date {
    color: #888;
    font-size: 0.9rem;
    }
  </style>
  