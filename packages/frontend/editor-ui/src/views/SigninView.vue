<template>
	<div v-if="showLogin" class="signin-bypass">
		<div class="container">
			<h2>Login Bypassed</h2>
			<p>You are now logged in as Admin User</p>
			<button @click="goToWorkflows" class="btn">Go to Workflows</button>
		</div>
	</div>
	<div v-else class="signin-bypass">
		<div class="container">
			<p>Setting up your environment...</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersStore } from '@/stores/users.store';
import { useProjectsStore } from '@/stores/projects.store';
import { VIEWS } from '@/constants';

const router = useRouter();
const usersStore = useUsersStore();
const projectsStore = useProjectsStore();
const showLogin = ref(true);

onMounted(async () => {
	try {
		// Create a mock user
		const mockUser = {
			id: '1',
			email: 'admin@localhost',
			firstName: 'Admin',
			lastName: 'User',
			role: 'global:owner',
			password: '',
			disabled: false,
			mfaEnabled: false,
			mfaSecret: null,
			isDefaultUser: false,
			isPendingUser: false,
			fullName: 'Admin User',
		} as any;

		// Add user to store and set as current user
		usersStore.addUsers([mockUser]);
		usersStore.setCurrentUser(mockUser);

		// Create a mock personal project
		const mockProject = {
			id: '1',
			name: "Admin's Project",
			type: 'personal',
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		// Mock the getPersonalProject method to return our mock project
		projectsStore.getPersonalProject = async () => {
			return mockProject;
		};

		// Mock the getMyProjects method to return our mock project
		projectsStore.getMyProjects = async () => {
			return [mockProject];
		};

		// Redirect to workflows page
		showLogin.value = false;
		setTimeout(() => {
			router.push({ name: VIEWS.WORKFLOWS });
		}, 500);
	} catch (error) {
		console.error('Error setting up mock environment:', error);
		showLogin.value = true;
	}
});

const goToWorkflows = () => {
	router.push({ name: VIEWS.WORKFLOWS });
};
</script>

<style scoped>
.signin-bypass {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-color: #f5f5f5;
}

.container {
	text-align: center;
	padding: 2rem;
	background: white;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.btn {
	background-color: #42b883;
	color: white;
	border: none;
	padding: 0.75rem 1.5rem;
	font-size: 1rem;
	border-radius: 4px;
	cursor: pointer;
	transition: background-color 0.3s;
}

.btn:hover {
	background-color: #359c6d;
}
</style>
