<template>
    <div>
      <button @click="goBack" class="back-button">← Revenir au mur de discussion</button>

      <form @submit.prevent="createExpense">
        
        <label for="amount">Quel est le montant ?</label>
        <input v-model="amount" id="amount" type="text" placeholder="Le montant" />
  
        <label for="description">La description</label>
        <input v-model="description" id="description" type="text" placeholder="Description" />
  
        <label for="date">La date de la dépense</label>
        <input type="date" id="date" v-model="date"/>
        
        <label>Participants</label>
        <div v-for="(participant, index) in listParticipants" :key="index">
          <input 
            type="checkbox" 
            :id="'participant-' + index" 
            :name="'participant-' + index" 
            v-model="participant.selected"/>
          <label :for="'participant-' + index">{{ participant.name || 'bite' }}</label>
        </div>
  
        <button type="submit">✔ Valider les changements</button>
      </form>
  
    </div>
  </template>

  <script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { useUserStore } from '../stores/userStore';

    const route = useRoute();
    const router = useRouter();
    const loading = ref(true);
    const error = ref(null);
    const userStore = useUserStore();
    const listParticipants = ref({});
    const amount = ref('');
    const description = ref('');
    const date = ref('');

    const goBack = () => {
      router.push({name:'EventTricount'}); // Retour à la liste des discussions
    };

    const fetchListParticipant = async () => {
        try {
            let apiUrl = `${import.meta.env.VITE_API_URL}/api/events/${route.params.id}/listParticipants`;
            
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Erreur HTTP');
            }
            let result = await response.json();

            listParticipants.value = result.listParticipants;
            
            initSelectedParticipant();
            
        } catch (err) {
            error.value = 'Erreur lors de la récupération des détails de l\'événement.';
            console.error(err);
        } finally {
            loading.value = false;
        }
    };

    const createExpense = async () => {
        try { 
            const listParticipantsSelected = listParticipants.value.filter(p => p.selected);
            console.log(date.value);
            
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/events/${route.params.id}/tricount/${userStore.token}/createExpense`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount.value,
                    description: description.value,
                    date: date.value,
                    distribution: 'equal',
                    participants: listParticipantsSelected,
                }),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la mise à jour");
            }

            const data = await response.json();

            console.log("Expense créée avec succès:", data); 
            
            goBack();
            
         }catch (error) {
            console.error("Erreur:", error);
        }    
    };

    const initSelectedParticipant = () => {
        
        listParticipants.value.forEach(participant => {            
            if (typeof participant.selected === 'undefined') {
                participant.selected = false;
            }
        });
    };

    
    
    onMounted(() => {
        fetchListParticipant();
    });

  </script>

  <style scoped>
    form {
      display: flex;
      flex-direction: column;
    }
  </style>