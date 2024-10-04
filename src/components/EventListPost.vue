<template>
    <div class="discussion-wall">
      <!-- Formulaire de publication -->
      <div class="post-form">
        <form @submit="createPost">
          <h3>Poster sur le mur de discussion</h3>
          <textarea placeholder="Coucou"  v-model="topic"></textarea>
  
          <button type="submit">➔ Poster</button>
        </form>
      </div>
  
      <!-- Liste des discussions -->
      <div class="discussions">
        <h3>Discussions</h3>
        <div v-for="(discussion, index) in listPost.listPost" :key="index" class="discussion-card">
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
    </div>
  </template>
  
  <script setup >
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useUserStore } from '../stores/userStore';

    const router = useRouter();
    const route = useRoute();
    const loading = ref(true);
    const error = ref(null);
    const listPost = ref({});
    const userStore = useUserStore();
    const topic = ref('');


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

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/${route.params.id}/messaging/${userStore.token}/createPost`, {
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
            let apiUrl = `${import.meta.env.VITE_API_URL}/api/events/${route.params.id}/messaging/listPost`;
            
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
      fetchListPosts();
    });
  </script>
  
  
  <style scoped>
  .discussion-wall {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    }

    .post-form {
    margin-bottom: 20px;
    }

    textarea {
    width: calc(100% - 20px);
    height: 80px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    font-size: 1rem;
    }

    button {
    background-color: black;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    }

    .discussions {
    margin-top: 20px;
    }

    .discussion-card {
    border: 1px solid #e0e0e0;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
    }

    .discussion-header {
    font-weight: bold;
    margin-bottom: 5px;
    }

    .discussion-content p {
    margin: 10px 0;
    }

    .date {
    color: #888;
    font-size: 0.9rem;
    }

    .actions {
    display: flex;
    justify-content: space-between;
    }

    .reply-button {
    background-color: #f0f0f0;
    color: black;
    border: 1px solid #ccc;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;
    }

    .reply-button:hover {
    background-color: #e0e0e0;
    }

  </style>
  