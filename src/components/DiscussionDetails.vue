<template>
  <div class="discussion-wall">
    <div class="header">
      <RouterLink class="link" to="/">
          <svg ref="logo" width="89" height="44" viewBox="0 0 89 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo" :style="{ transform: `translateY(${translateY}px)` }">
            <rect width="89" height="44" rx="21.5235" fill="black"/>
            <path d="M73.4325 16.3495C73.4325 19.9342 70.6603 21.9178 67.1951 22.109L69.7044 28.6093C70.2062 29.8998 71.3534 29.8998 71.9269 29.9476L71.6401 31.0469H67.0756L63.5864 22.1568H62.0569L60.5036 28.2269C60.4319 28.4659 60.408 28.681 60.408 28.8722C60.408 30.0193 61.6029 29.8998 62.1764 29.9715L61.9613 31.0469H54.0988L54.4095 29.9715C54.9592 29.9476 56.5842 29.8042 57.0861 27.7967L60.1212 15.6325C60.1929 15.3696 60.2168 15.1307 60.2168 14.9395C60.2168 13.649 58.998 13.5534 58.4722 13.5534L58.7351 12.4063H66.5737C70.6842 12.4063 73.4325 13.5534 73.4325 16.3495ZM69.7522 16.4451C69.7522 14.7483 68.1271 14.3181 65.8807 14.3181H64.0166L62.5827 20.1971H64.8769C67.8881 20.1971 69.7522 18.8349 69.7522 16.4451Z" fill="white"/>
            <path d="M56.1251 12.4063L56.866 17.1142L55.6472 17.3771L54.8585 15.5369C54.4523 14.581 53.5919 14.0074 51.919 14.0074H48.2148C47.2589 14.0074 46.8526 14.3898 46.5897 15.3935L45.347 20.2688H49.5053C51.3455 20.2688 51.704 19.4085 51.8712 19.05L52.2058 18.3091H53.4963L51.9668 24.2359H50.6763C50.7241 23.973 50.7958 23.5906 50.7958 23.2561C50.7958 22.6108 50.5568 22.0134 49.5531 22.0134H44.893L43.244 28.4898C43.1962 28.6571 43.1723 28.7766 43.1723 28.8961C43.1723 29.374 43.5308 29.5174 44.2955 29.5174H47.6413C50.2701 29.5174 51.7996 28.1552 52.5882 27.3427L54.2133 25.6459L55.0019 26.2195L51.7279 31.0469H36.887L37.1738 29.8998C38.1298 29.8281 39.3486 29.852 39.8026 28.0118L43.005 15.2502C43.0528 15.0351 43.0767 14.8439 43.0767 14.6766C43.0767 13.5534 41.9296 13.6251 41.3799 13.5534L41.5711 12.4063H56.1251Z" fill="white"/>
            <path d="M32.4569 12.4063H40.1282L39.8176 13.5534C39.1484 13.649 38.2403 13.888 36.7347 15.0351L30.0671 20.1015L34.775 28.6571C35.3486 29.6847 36.9737 29.8998 37.6189 29.9476L37.4038 31.0469H28.5137L28.7527 29.9715C29.4218 29.9476 30.8318 29.9715 30.8318 28.9439C30.8318 28.6571 30.7123 28.2747 30.4733 27.8206L27.3666 22.0851L25.8371 23.2561L24.69 27.8684C24.5944 28.203 24.5705 28.4898 24.5705 28.7288C24.5705 30.0193 25.6459 29.9237 26.3151 29.9954L26.1 31.0469H18.2852L18.5003 29.9476C19.289 29.8998 20.7229 29.7325 21.2247 27.7728L24.2598 15.6803C24.2837 15.5369 24.3076 15.4174 24.3076 15.2741C24.3076 13.7924 21.9417 13.649 20.3405 13.649H19.3846C16.3256 13.6729 13.9597 15.2741 13.9597 18.5242C13.9597 19.8625 14.82 21.6071 16.3973 21.6071C17.6639 21.6071 17.6161 20.5317 17.7356 19.5996C17.879 18.5003 18.6198 17.2815 19.9581 17.2815C20.8663 17.2815 21.4398 18.1419 21.4398 19.0022C21.4398 21.2725 19.2651 23.2083 16.7558 23.2083C13.9836 23.2083 12 21.3203 12 18.5959C12 14.581 15.0351 12 19.1695 12C22.2285 12 24.5705 12.4063 27.6534 12.4063H30.7601L30.4733 13.5534C29.5174 13.649 28.2508 13.8163 27.8206 15.5847L26.6018 20.6034L33.15 15.6086C33.6996 15.2024 33.8908 14.8439 33.8908 14.581C33.8908 13.9358 32.8393 13.6251 32.2179 13.5534L32.4569 12.4063Z" fill="white"/>
          </svg>
      </RouterLink>
      <button @click="goBack" class="back">
        Retour 
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.2333 17.7792C14.36 17.7792 14.4867 17.7325 14.5867 17.6325C14.78 17.4392 14.78 17.1192 14.5867 16.9258L10.24 12.5792C9.91999 12.2592 9.91999 11.7392 10.24 11.4192L14.5867 7.0725C14.78 6.87917 14.78 6.55917 14.5867 6.36583C14.3933 6.1725 14.0733 6.1725 13.88 6.36583L9.53333 10.7125C9.19333 11.0525 8.99999 11.5125 8.99999 11.9992C8.99999 12.4858 9.18666 12.9458 9.53333 13.2858L13.88 17.6325C13.98 17.7258 14.1067 17.7792 14.2333 17.7792Z" fill="#A8ACB7"/>
        </svg>
      </button>
    </div>
    <div class="discussion-details">
      <div class="main-post" v-if="listDiscussion.post">
        <p class="author">{{ listDiscussion.post.creatorName }}</p>
        <p class="content">{{ listDiscussion.post.topic }}</p>
        <p class="date">{{ formatDate(listDiscussion.post.createdAt) }}</p>
      </div>

      <div class="post-form">
        <form @submit="createMessage">
          <textarea v-model="newResponseText" placeholder="Votre message"></textarea>
          
          <button type="submit" id="submit">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.48 18.42C12.6933 18.42 11.58 17.8667 10.7 15.22L10.22 13.78L8.78 13.3C6.14 12.42 5.58667 11.3067 5.58667 10.52C5.58667 9.74 6.14 8.62 8.78 7.73334L14.44 5.84667C15.8533 5.37334 17.0333 5.51333 17.76 6.23333C18.4867 6.95334 18.6267 8.14 18.1533 9.55333L16.2667 15.2133C15.38 17.8667 14.2667 18.42 13.48 18.42ZM9.09334 8.68667C7.24 9.30667 6.58 10.04 6.58 10.52C6.58 11 7.24 11.7333 9.09334 12.3467L10.7733 12.9067C10.92 12.9533 11.04 13.0733 11.0867 13.22L11.6467 14.9C12.26 16.7533 13 17.4133 13.48 17.4133C13.96 17.4133 14.6933 16.7533 15.3133 14.9L17.2 9.24C17.54 8.21334 17.48 7.37334 17.0467 6.94C16.6133 6.50667 15.7733 6.45334 14.7533 6.79334L9.09334 8.68667Z" fill="#ffffff"/>
              <path d="M10.74 13.6C10.6133 13.6 10.4867 13.5533 10.3867 13.4533C10.1933 13.26 10.1933 12.94 10.3867 12.7467L12.7733 10.3533C12.9667 10.16 13.2867 10.16 13.48 10.3533C13.6733 10.5467 13.6733 10.8667 13.48 11.06L11.0933 13.4533C11 13.5533 10.8667 13.6 10.74 13.6Z" fill="#ffffff"/>
            </svg>
          </button>
        </form>
      </div>
  
      <div v-for="(response, index) in listDiscussion.listDiscussion" :key="index" class="response-card">
        <div class="response-header">
          <p class="author">{{ response.writorName }}</p>
        </div>
        <div class="response-content">
          <p class="content">{{ response.messageText }}</p>
          <p class="date">{{ formatDate(response.createdAt) }}</p>
        </div>
      </div>

      <div class="padding-bottom"></div>

    </div>
  </div>
</template>
  
  <script setup >
    import { ref, onMounted, onUnmounted, defineProps } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useUserStore } from '../stores/userStore';

    const route = useRoute();
    const router = useRouter();
    const newResponseText = ref('');
    const listDiscussion = ref({});
    const loading = ref(true);
    const error = ref(null);
    const userStore = useUserStore();
    let socket;
    const translateY = ref(0); // Gère la position Y de l'effet parallax
    const isWideScreen = ref(window.innerWidth >= 768);

    defineProps({
      id: String,
      postId: String
    });
    
    const API_URL = import.meta.env.DEV  
    ? `${window.location.protocol}//${window.location.hostname}:3000`
    : import.meta.env.VITE_API_URL;

    const rawUrl = API_URL.replace(/^https?:\/\//, '');

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

    // Fonction pour mettre à jour l'effet parallax
    const handleScroll = () => {
      const scrollTop = window.scrollY; // Distance scrollée
      translateY.value = -scrollTop; // Ajuste le facteur parallax
    };

    // Fonction pour vérifier la taille de l'écran
    const handleResize = () => {
      isWideScreen.value = window.innerWidth >= 768; // Met à jour la condition
    };


    const createMessage = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events/${route.params.id}/messaging/${userStore.token}/post/${route.params.postId}/createDiscussion`, {
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
            let apiUrl = `${API_URL}/api/events/${route.params.id}/messaging/post/${route.params.postId}/listDiscussion`;
            
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
      // Connexion au WebSocket
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
        
        if (message.type === 'NEW_DISCUSSION') {
          listDiscussion.value.listDiscussion.push(message.data);
        }
      };
      fetchListDiscussion();
      handleResize(); // Vérifie initialement la largeur
      window.addEventListener("resize", handleResize); // Écoute les changements de taille

      if (isWideScreen.value) {
        window.addEventListener("scroll", handleScroll); // Active l'effet parallax
      }
    });

    onUnmounted(() => {
      if (socket) {
        socket.close();
      }
      window.removeEventListener("resize", handleResize); // Nettoie les événements
      window.removeEventListener("scroll", handleScroll); // Nettoie les événements
    });

  </script>
  
  <style scoped>

    .discussion-wall {
      width: 100%;
      height: 100%;
      background-color: #FFFFFF;
    }

    .header {
      position: sticky;
      display: flex;
      padding: 16px 5% 20px 5%;
      width: 90%;
      justify-content: space-between;
      z-index: 1;
      top: 0;
      background-color: #FFFFFF;
    }

    .header > a {
      height: 44px;
    }

    .header > button {
      border: none;
      background-color: transparent;
      font-family: 'General sans';
      font-size: 14px;
      font-weight: 500;
      color: #A8ACB7;
      display: flex;
      align-items: center;
    }

    .discussion-details {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: auto;
      align-items: center;
      position: relative;
    }

    .main-post {
      width: calc(90% - 48px);
      border: 1px solid #ebedf2;
      border-radius: 4px;
      background-color: #f5F6F8;
      padding: 0px 24px 8px 24px;
    }

    .author {
      font-family: 'Switzer';
      font-size: 14px;
      font-size: 14px;
      font-weight: 600;
      color: #a8acb7;
    }

    .content {
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

    .response-card {
      border: 1px solid #ebedf2;
      padding: 0px 20px 4px 20px;
      border-radius: 4px;
      margin-top: 20px;
      background-color: #ffffff;
      width: calc(75% - 40px);
    }
    
    .post-form {
      position: fixed;
      bottom: 3px;
      height: auto;
      width: 96%;
    }

    textarea {
      width: calc(100% - 67px);
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

    .padding-bottom {
      min-height: 170px;
      width: 100%;
      background-color: transparent;
    }

    .back {
      cursor: pointer;
    }

    @media (min-width: 768px) {
      .post-form {
        position: relative;
        margin-top: 20px;
        bottom: 0px;
        width: 90%;
      }

      textarea {
        height: 70px;
      }

      .logo {
        position: fixed;
        top: 40px;
        left: 0;
        right: 0;
        margin: auto;
      }

      .back {
        position: fixed;
        top: 135px;
        left: calc((100dvw - 750px) / 2);
      }

      .header {
        height: 20px;
        padding: 0px;
        width: 750px;
      }
    }

  </style>
  