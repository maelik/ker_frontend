
<template>
    <div class="event-list-participant-container">
      <div class="info-container">
        <div class="line"></div>
        <span class="info-text">Participants</span>
        <div class="line"></div>
      </div>

      <div v-if="loading">Chargement des données...</div>
        <div v-else-if="error">{{ error }}</div>
          <div v-else class="list-participant-scroll">

            <div class="section">
              <div class="title-section">                
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z" fill="#292D32"/>
                    <path d="M8.82 9.74994C7.97 9.74994 7.12 9.42994 6.47 8.77994C6.18 8.48994 6.18 8.00994 6.47 7.71994C6.76 7.42994 7.24 7.42994 7.53 7.71994C8.24 8.42994 9.4 8.42994 10.11 7.71994C10.4 7.42994 10.88 7.42994 11.17 7.71994C11.46 8.00994 11.46 8.48994 11.17 8.77994C10.52 9.41994 9.67 9.74994 8.82 9.74994Z" fill="#292D32"/>
                    <path d="M15.18 9.74994C14.33 9.74994 13.48 9.42994 12.83 8.77994C12.54 8.48994 12.54 8.00994 12.83 7.71994C13.12 7.42994 13.6 7.42994 13.89 7.71994C14.6 8.42994 15.76 8.42994 16.47 7.71994C16.76 7.42994 17.24 7.42994 17.53 7.71994C17.82 8.00994 17.82 8.48994 17.53 8.77994C16.88 9.41994 16.03 9.74994 15.18 9.74994Z" fill="#292D32"/>
                    <path d="M12 19.15C9.1 19.15 6.75 16.79 6.75 13.9C6.75 12.99 7.49 12.25 8.4 12.25H15.6C16.51 12.25 17.25 12.99 17.25 13.9C17.25 16.79 14.9 19.15 12 19.15ZM8.4 13.75C8.32 13.75 8.25 13.82 8.25 13.9C8.25 15.97 9.93 17.65 12 17.65C14.07 17.65 15.75 15.97 15.75 13.9C15.75 13.82 15.68 13.75 15.6 13.75H8.4Z" fill="#292D32"/>
                  </svg>
                  <h3>Peut venir</h3>
              </div>

              <div v-for="(person, index) in canCome" :key="index" class="card">
                
                  <span class="name">{{ person.guestName }}</span>
                  <ul class="dates">
                    <li v-for="(response, i) in person.GuestResponses" :key="i">
                      <div v-if="response.response == true">
                        <span>
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.0313 16.2786H6.96877C3.29221 16.2786 1.72137 14.7078 1.72137 11.0312V6.96875C1.72137 3.29219 3.29221 1.72135 6.96877 1.72135H11.0313C14.7078 1.72135 16.2787 3.29219 16.2787 6.96875V11.0312C16.2787 14.7078 14.7078 16.2786 11.0313 16.2786ZM6.96877 2.73698C3.84742 2.73698 2.737 3.84739 2.737 6.96875V11.0312C2.737 14.1526 3.84742 15.263 6.96877 15.263H11.0313C14.1526 15.263 15.263 14.1526 15.263 11.0312V6.96875C15.263 3.84739 14.1526 2.73698 11.0313 2.73698H6.96877Z" fill="#131313"/>
                            <path d="M8.03854 11.424C7.90312 11.424 7.77448 11.3698 7.67968 11.275L5.76354 9.35886C5.56718 9.16251 5.56718 8.83751 5.76354 8.64115C5.95989 8.4448 6.28489 8.4448 6.48125 8.64115L8.03854 10.1984L11.5187 6.71823C11.7151 6.52188 12.0401 6.52188 12.2365 6.71823C12.4328 6.91459 12.4328 7.23959 12.2365 7.43594L8.39739 11.275C8.3026 11.3698 8.17395 11.424 8.03854 11.424Z" fill="#131313"/>
                          </svg>
                        </span> 
                        <p id="responseTrue">{{ response.EventDate.proposed_date }}</p>
                      </div>
                      <div v-else>
                        <span>
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.08382 11.424C6.95517 11.424 6.82653 11.3766 6.72496 11.275C6.52861 11.0786 6.52861 10.7536 6.72496 10.5573L10.5573 6.725C10.7536 6.52865 11.0786 6.52865 11.275 6.725C11.4713 6.92136 11.4713 7.24636 11.275 7.44271L7.44267 11.275C7.34788 11.3766 7.21246 11.424 7.08382 11.424Z" fill="#A8ACB7"/>
                            <path d="M10.9161 11.424C10.7875 11.424 10.6588 11.3766 10.5573 11.275L6.72496 7.44271C6.52861 7.24636 6.52861 6.92136 6.72496 6.725C6.92132 6.52865 7.24632 6.52865 7.44267 6.725L11.275 10.5573C11.4713 10.7536 11.4713 11.0786 11.275 11.275C11.1734 11.3766 11.0448 11.424 10.9161 11.424Z" fill="#A8ACB7"/>
                            <path d="M11.0313 16.2786H6.96877C3.29221 16.2786 1.72137 14.7078 1.72137 11.0312V6.96875C1.72137 3.29219 3.29221 1.72135 6.96877 1.72135H11.0313C14.7078 1.72135 16.2787 3.29219 16.2787 6.96875V11.0312C16.2787 14.7078 14.7078 16.2786 11.0313 16.2786ZM6.96877 2.73698C3.84742 2.73698 2.737 3.84739 2.737 6.96875V11.0312C2.737 14.1526 3.84742 15.263 6.96877 15.263H11.0313C14.1526 15.263 15.263 14.1526 15.263 11.0312V6.96875C15.263 3.84739 14.1526 2.73698 11.0313 2.73698H6.96877Z" fill="#A8ACB7"/>
                          </svg>
                        </span>
                        <p id="responseFalse">{{ response.EventDate.proposed_date }}</p>
                      </div>
                    </li>
                  </ul>

              </div>

            </div>
  
            <div class="section">
              <div class="title-section">                
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z" fill="#292D32"/>
                    <path d="M10.64 9.49994C10.45 9.49994 10.26 9.42994 10.11 9.27994C9.4 8.56994 8.24 8.56994 7.53 9.27994C7.24 9.56994 6.76 9.56994 6.47 9.27994C6.18 8.98994 6.18 8.50994 6.47 8.21994C7.76 6.92994 9.87 6.92994 11.17 8.21994C11.46 8.50994 11.46 8.98994 11.17 9.27994C11.02 9.42994 10.83 9.49994 10.64 9.49994Z" fill="#292D32"/>
                    <path d="M13.36 9.49994C13.17 9.49994 12.98 9.42994 12.83 9.27994C12.54 8.98994 12.54 8.50994 12.83 8.21994C14.12 6.92994 16.23 6.92994 17.53 8.21994C17.82 8.50994 17.82 8.98994 17.53 9.27994C17.24 9.56994 16.76 9.56994 16.47 9.27994C15.76 8.56994 14.6 8.56994 13.89 9.27994C13.75 9.42994 13.56 9.49994 13.36 9.49994Z" fill="#292D32"/>
                    <path d="M15.6 18.4498H8.4C7.49 18.4498 6.75 17.7098 6.75 16.7998C6.75 13.9098 9.1 11.5498 12 11.5498C14.9 11.5498 17.25 13.9098 17.25 16.7998C17.25 17.7098 16.51 18.4498 15.6 18.4498ZM12 13.0498C9.93 13.0498 8.25 14.7298 8.25 16.7998C8.25 16.8798 8.32 16.9498 8.4 16.9498H15.6C15.68 16.9498 15.75 16.8798 15.75 16.7998C15.75 14.7298 14.07 13.0498 12 13.0498Z" fill="#292D32"/>
                  </svg>
                  <h3>Ne peut pas venir</h3>
              </div>

              <div v-for="(person, index) in cannotCome" :key="index" class="card">
                <span class="name">{{ person.guestName }}</span>
              </div>

            </div>

            <div class="padding-bottom"></div>
          </div>
    </div>
  </template>


  
  <script setup >
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const loading = ref(true);
    const error = ref(null);
    const canCome = ref({});
    const cannotCome = ref({});
    const API_URL = import.meta.env.DEV  
    ? `${window.location.protocol}//${window.location.hostname}:3000`
    : import.meta.env.VITE_API_URL;

    const fetchListParticipants = async () => {
    try {
      let apiUrl = `${API_URL}/api/events/${route.params.id}/responsesParticipant`;
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Erreur HTTP');
      }
      let result = await response.json();
      canCome.value = result.canCome;
      canCome.value.forEach(element => {
        element.GuestResponses.forEach( response => {
          const date = new Date(response.EventDate.proposed_date);
          response.EventDate.proposed_date = new Intl.DateTimeFormat("fr-FR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }).format(date);                    
        });        
      });
      
      cannotCome.value = result.cannotCome;
      
    } catch (err) {
      error.value = 'Erreur lors de la récupération des détails de l\'événement.';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

    onMounted(() => {
      fetchListParticipants();
    });
  </script>
  
  <style scoped>
  .event-list-participant-container {
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

  .list-participant-scroll {
    display: flex;
    flex-direction: column;
    width: 100dvw;
    height: auto;
    max-height: 100%;
    overflow-y: auto;
    align-items: center;
    margin-top: 20px;
  }

  .padding-bottom {
    min-height: 200px;
    width: 100%;
    background-color: transparent;
  }

  .section {
    width: 75dvw;
  }

  .title-section {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  h3 {
    font-family: 'General sans';
    font-size: 16px;
    font-weight: 500;
  }

  .card {
    border: 1px solid #ebedf2;
    padding: 15px;
    border-radius: 4px;
    background-color: #ffffff;
    margin-bottom: 15px;
  }

  .name {
    font-family: 'Switzer';
    font-size: 16px;
    font-weight: 400;
    color: #131313;
  }

  .dates {
    list-style: none;
    padding-left: 0;
    margin: 10px 0 0 0;
  }

  .dates li div{
    margin: 5px 0;
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .dates li span {
    display: flex;
    align-items: center;
  }

  .dates li div p {
    font-family: 'General sans';
    font-size: 14px;
    line-height: 14px;
    font-weight: 600;
    margin: 5px 0px;
  }
  
  #responseTrue {
    color: #131313;
  }

  #responseFalse {
    color: #a8acb7;
  }

  </style>
  