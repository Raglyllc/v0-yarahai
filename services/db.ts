import type { User, Conversation, Message, YarahAIResponse } from '../types';

// --- User Management ---

// Simple in-memory hash for password simulation
const simpleHash = (s: string) => {
    let h = 0;
    for(let i = 0; i < s.length; i++) {
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    }
    return h.toString();
}

export const createUser = (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users: User[] = JSON.parse(localStorage.getItem('yarah_users') || '[]');
            if (users.some(u => u.email === email)) {
                return reject(new Error('User with this email already exists.'));
            }
            const newUser: User = {
                id: `user_${Date.now()}`,
                email,
                passwordHash: simpleHash(password),
            };
            users.push(newUser);
            localStorage.setItem('yarah_users', JSON.stringify(users));
            localStorage.setItem('yarah_currentUser', JSON.stringify(newUser));
            resolve(newUser);
        }, 500);
    });
};


export const loginUser = (email: string, password: string): Promise<User> => {
     return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users: User[] = JSON.parse(localStorage.getItem('yarah_users') || '[]');
            const user = users.find(u => u.email === email);
            if (user && user.passwordHash === simpleHash(password)) {
                 localStorage.setItem('yarah_currentUser', JSON.stringify(user));
                resolve(user);
            } else {
                reject(new Error('Invalid email or password.'));
            }
        }, 500);
    });
};

export const logoutUser = () => {
    localStorage.removeItem('yarah_currentUser');
};

export const getCurrentUser = (): User | null => {
    const userJson = localStorage.getItem('yarah_currentUser');
    return userJson ? JSON.parse(userJson) : null;
};

// --- Conversation Management ---

export const getConversationsForUser = (userId: string): Promise<Conversation[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const allConversations: Conversation[] = JSON.parse(localStorage.getItem('yarah_conversations') || '[]');
            const userConversations = allConversations
                .filter(c => c.userId === userId)
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            resolve(userConversations);
        }, 300);
    });
};

export const saveConversation = (conversation: Conversation): Promise<Conversation> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const allConversations: Conversation[] = JSON.parse(localStorage.getItem('yarah_conversations') || '[]');
            const index = allConversations.findIndex(c => c.id === conversation.id);
            if (index > -1) {
                allConversations[index] = conversation;
            } else {
                allConversations.push(conversation);
            }
            localStorage.setItem('yarah_conversations', JSON.stringify(allConversations));
            resolve(conversation);
        }, 300);
    });
};

export const createNewConversation = (userId: string, firstMessage: Message): Promise<Conversation> => {
    const title = firstMessage.question?.substring(0, 40) + '...' || 'New Conversation';
    const newConversation: Conversation = {
        id: `conv_${Date.now()}`,
        userId,
        title,
        messages: [firstMessage],
        createdAt: new Date().toISOString(),
    };
    return saveConversation(newConversation);
};
