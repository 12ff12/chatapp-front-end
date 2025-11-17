import img from '@/assets/profile.jpg';

interface Message {
  id: number;
  type: string;
  message: string;
  time: string;
}

interface User {
  id: number;
  name: string;
  image: string;
  lastMessage: string;
  lastMessageTime: string;
  message: Message[];
}

export const users: User[] = [
    {
      id: 1,
      name: "John Doe",
      image: img,
      lastMessage: "See you at the meeting!",
      lastMessageTime: "10:30 AM",
      message: [
        {
          id: 1,
          type: "received",
          message: "Hi there! How's the project going?",
          time: "9:00 AM"
        },
        {
          id: 2,
          type: "sent",
          message: "Going well! Just finished the UI components.",
          time: "9:15 AM"
        },
        {
          id: 3,
          type: "received",
          message: "Great! Can you share the progress in our next meeting?",
          time: "9:30 AM"
        },
        {
          id: 4,
          type: "sent",
          message: "Sure, I'll prepare a demo. What time works for you?",
          time: "9:32 AM"
        },
        {
          id: 5,
          type: "received",
          message: "How about 2 PM?",
          time: "9:35 AM"
        },
        {
          id: 6,
          type: "sent",
          message: "Perfect! See you at the meeting.",
          time: "10:30 AM"
        },
        {
          id: 7,
          type: "received",
          message: "Hi there! How's the project going?",
          time: "9:00 AM"
        },
        {
          id: 8,
          type: "sent",
          message: "Going well! Just finished the UI components.",
          time: "9:15 AM"
        },
        {
          id: 9,
          type: "received",
          message: "Great! Can you share the progress in our next meeting?",
          time: "9:30 AM"
        },
        {
          id: 10,
          type: "sent",
          message: "Sure, I'll prepare a demo. What time works for you?",
          time: "9:32 AM"
        },
        {
          id: 11,
          type: "received",
          message: "How about 2 PM?",
          time: "9:35 AM"
        },
        {
          id: 12,
          type: "sent",
          message: "Perfect! See you at the meeting.",
          time: "10:30 AM"
        },
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      image: img,
      lastMessage: "I've sent the design files",
      lastMessageTime: "9:15 AM",
      message: [
        {
          id: 1,
          type: "received",
          message: "Hi! Do you have the latest design assets?",
          time: "8:00 AM"
        },
        {
          id: 2,
          type: "sent",
          message: "Not yet, when will they be ready?",
          time: "8:15 AM"
        },
        {
          id: 3,
          type: "received",
          message: "Working on them now. Need about an hour.",
          time: "8:30 AM"
        },
        {
          id: 4,
          type: "sent",
          message: "No problem, take your time.",
          time: "8:32 AM"
        },
        {
          id: 5,
          type: "received",
          message: "I've sent the design files to your email.",
          time: "9:15 AM"
        }
      ]
    },
    {
      id: 3,
      name: "Mike Johnson",
      image: img,
      lastMessage: "Let's meet tomorrow at 3 PM",
      lastMessageTime: "Yesterday",
      message: [
        {
          id: 1,
          type: "sent",
          message: "Hey Mike, do you have time to discuss the project?",
          time: "Yesterday, 2:00 PM"
        },
        {
          id: 2,
          type: "received",
          message: "Sure, what would you like to discuss?",
          time: "Yesterday, 2:15 PM"
        },
        {
          id: 3,
          type: "sent",
          message: "The new feature requirements and timeline.",
          time: "Yesterday, 2:16 PM"
        },
        {
          id: 4,
          type: "received",
          message: "I'm in meetings all day today. Let's meet tomorrow at 3 PM?",
          time: "Yesterday, 2:30 PM"
        },
        {
          id: 5,
          type: "sent",
          message: "That works for me. See you then!",
          time: "Yesterday, 2:32 PM"
        }
      ]
    },
    {
      id: 4,
      name: "Sarah Wilson",
      image: img,
      lastMessage: "Thanks for your help with the bug fix!",
      lastMessageTime: "Yesterday",
      message: [

      ]
    },
    {
      id: 5,
      name: "David Brown",
      image: img,
      lastMessage: "Let's catch up over coffee",
      lastMessageTime: "Monday",
      message: [
        {
          id: 1,
          type: "received",
          message: "Long time no see! How have you been?",
          time: "Monday, 9:00 AM"
        },
        {
          id: 2,
          type: "sent",
          message: "I've been good! Busy with the new project.",
          time: "Monday, 9:15 AM"
        },
        {
          id: 3,
          type: "received",
          message: "I'd love to hear about it. Coffee this week?",
          time: "Monday, 9:30 AM"
        },
        {
          id: 4,
          type: "sent",
          message: "Absolutely! How about Thursday afternoon?",
          time: "Monday, 9:32 AM"
        },
        {
          id: 5,
          type: "received",
          message: "Perfect! Let's catch up over coffee then.",
          time: "Monday, 9:35 AM"
        }
      ]
    },
    {
      id: 6,
      name: "Emily Davis",
      image: img,
      lastMessage: "Can we reschedule our meeting?",
      lastMessageTime: "Monday",
      message: [
        {
          id: 1,
          type: "sent",
          message: "Hi Emily, just a reminder about our meeting tomorrow at 2 PM.",
          time: "Monday, 3:00 PM"
        },
        {
          id: 2,
          type: "received",
          message: "Hi! Actually, I have a conflict at that time.",
          time: "Monday, 3:15 PM"
        },
        {
          id: 3,
          type: "received",
          message: "Can we reschedule for Wednesday at the same time?",
          time: "Monday, 3:16 PM"
        },
        {
          id: 4,
          type: "sent",
          message: "Let me check my calendar...",
          time: "Monday, 3:20 PM"
        },
        {
          id: 5,
          type: "sent",
          message: "Wednesday at 2 PM works for me. See you then!",
          time: "Monday, 3:22 PM"
        }
      ]
    },
    {
      id: 7,
      name: "Robert Taylor",
      image: img,
      lastMessage: "The files are ready for review",
      lastMessageTime: "Sunday",
      message: [
        { id: 1, type: "received", message: "Hi Robert, could you review the project files when you get a chance?", time: "Sunday, 9:15 AM" },
        { id: 2, type: "sent", message: "Sure, I'll take a look at them today.", time: "Sunday, 10:30 AM" },
        { id: 3, type: "received", message: "Thanks, I appreciate it. The deadline is tomorrow.", time: "Sunday, 10:45 AM" },
        { id: 4, type: "sent", message: "No problem. I'll send you my feedback by this evening.", time: "Sunday, 11:00 AM" },
        { id: 5, type: "sent", message: "The files are ready for review. I've left some comments in the document.", time: "Sunday, 4:20 PM" }
      ]
    },
    {
      id: 8,
      name: "Lisa Anderson",
      image: img,
      lastMessage: "I'll check the requirements",
      lastMessageTime: "Sunday",
      message: [
        { id: 1, type: "received", message: "Lisa, can you verify the project requirements?", time: "Sunday, 2:30 PM" },
        { id: 2, type: "sent", message: "I'll check the requirements and get back to you.", time: "Sunday, 3:15 PM" },
        { id: 3, type: "received", message: "Great, let me know if you need any clarification.", time: "Sunday, 3:20 PM" },
        { id: 4, type: "sent", message: "I've reviewed them. There are a couple of points I'd like to discuss.", time: "Sunday, 4:45 PM" },
        { id: 5, type: "received", message: "Let's schedule a call tomorrow to go over them.", time: "Sunday, 5:00 PM" }
      ]
    },
    {
      id: 9,
      name: "James Wilson",
      image: img,
      lastMessage: "I'll be there in 10",
      lastMessageTime: "Saturday",
      message: [
        { id: 1, type: "sent", message: "Hey James, are you on your way?", time: "Saturday, 7:45 PM" },
        { id: 2, type: "received", message: "Yes, just leaving now. I'll be there in 10.", time: "Saturday, 7:50 PM" },
        { id: 3, type: "sent", message: "Perfect, see you soon!", time: "Saturday, 7:51 PM" }
      ]
    },
    {
      id: 10,
      name: "Emma Martinez",
      image: img,
      lastMessage: "Sounds good to me!",
      lastMessageTime: "Friday",
      message: [
        { id: 1, type: "received", message: "How about we meet at the new coffee shop at 2?", time: "Friday, 11:30 AM" },
        { id: 2, type: "sent", message: "Sounds good to me! I'll see you there.", time: "Friday, 11:35 AM" }
      ]
    },
    {
      id: 11,
      name: "Daniel Thomas",
      image: img,
      lastMessage: "Got it, thanks!",
      lastMessageTime: "Friday",
      message: [
        { id: 1, type: "received", message: "I've sent you the updated files. Let me know if you need anything else.", time: "Friday, 9:10 AM" },
        { id: 2, type: "sent", message: "Got it, thanks! I'll review them now.", time: "Friday, 9:15 AM" },
        { id: 3, type: "received", message: "Great, I'll be available if you have any questions.", time: "Friday, 9:20 AM" }
      ]
    },
    {
      id: 12,
      name: "Olivia Garcia",
      image: img,
      lastMessage: "Please review the document",
      lastMessageTime: "Thursday",
      message: [
        { id: 1, type: "received", message: "I've finished the first draft of the proposal.", time: "Thursday, 3:45 PM" },
        { id: 2, type: "received", message: "Please review the document and let me know your thoughts.", time: "Thursday, 3:45 PM" },
        { id: 3, type: "sent", message: "I'll take a look at it first thing tomorrow morning.", time: "Thursday, 4:30 PM" }
      ]
    },
    {
      id: 13,
      name: "William Lee",
      image: img,
      lastMessage: "On my way to the office",
      lastMessageTime: "Thursday",
      message: [
        { id: 1, type: "sent", message: "William, are you coming to the office today?", time: "Thursday, 8:10 AM" },
        { id: 2, type: "received", message: "Yes, on my way to the office now. Be there in 15.", time: "Thursday, 8:15 AM" },
        { id: 3, type: "sent", message: "Great, we have a meeting at 9.", time: "Thursday, 8:16 AM" }
      ]
    },
    {
      id: 14,
      name: "Sophia Clark",
      image: img,
      lastMessage: "Let me know your thoughts",
      lastMessageTime: "Wednesday",
      message: [
        { id: 1, type: "received", message: "I've shared the design mockups with you.", time: "Wednesday, 2:00 PM" },
        { id: 2, type: "received", message: "Let me know your thoughts when you get a chance.", time: "Wednesday, 2:00 PM" },
        { id: 3, type: "sent", message: "Thanks, I'll review them and get back to you by EOD.", time: "Wednesday, 2:30 PM" }
      ]
    },
    {
      id: 15,
      name: "Ethan Rodriguez",
      image: img,
      lastMessage: "I agree with the changes",
      lastMessageTime: "Wednesday",
      message: [
        { id: 1, type: "received", message: "I've made the updates we discussed. What do you think?", time: "Wednesday, 11:20 AM" },
        { id: 2, type: "sent", message: "I agree with the changes. They look good!", time: "Wednesday, 11:45 AM" },
        { id: 3, type: "received", message: "Great, I'll proceed with these then.", time: "Wednesday, 11:50 AM" }
      ]
    },
    {
      id: 16,
      name: "Ava Hernandez",
      image: img,
      lastMessage: "Great job on the presentation!",
      lastMessageTime: "Tuesday",
      message: [
        { id: 1, type: "received", message: "Just wanted to say great job on the presentation today!", time: "Tuesday, 4:15 PM" },
        { id: 2, type: "sent", message: "Thank you! I'm glad it went well.", time: "Tuesday, 4:30 PM" },
        { id: 3, type: "received", message: "The client was really impressed with your work.", time: "Tuesday, 4:35 PM" }
      ]
    },
    {
      id: 17,
      name: "Noah Martinez",
      image: img,
      lastMessage: "Let's discuss this tomorrow",
      lastMessageTime: "Tuesday",
      message: [
        { id: 1, type: "received", message: "I have some concerns about the project timeline.", time: "Tuesday, 5:45 PM" },
        { id: 2, type: "sent", message: "Let's discuss this tomorrow morning. I'll be in the office by 9.", time: "Tuesday, 6:00 PM" },
        { id: 3, type: "received", message: "Sounds good, I'll see you then.", time: "Tuesday, 6:05 PM" }
      ]
    },
    {
      id: 18,
      name: "Isabella Lopez",
      image: img,
      lastMessage: "What's the status on the project?",
      lastMessageTime: "Monday",
      message: [
        { id: 1, type: "received", message: "What's the status on the project? We need an update for the client.", time: "Monday, 2:00 PM" },
        { id: 2, type: "sent", message: "I'm about 75% done. Should have it completed by Wednesday.", time: "Monday, 2:30 PM" },
        { id: 3, type: "received", message: "Great, please keep me posted on your progress.", time: "Monday, 2:35 PM" }
      ]
    },
    {
      id: 19,
      name: "Mason Gonzalez",
      image: img,
      lastMessage: "I'll send you the files shortly",
      lastMessageTime: "Monday",
      message: [
        { id: 1, type: "sent", message: "Do you have those reports ready?", time: "Monday, 10:15 AM" },
        { id: 2, type: "received", message: "I'll send you the files shortly. Just finishing up some final edits.", time: "Monday, 10:30 AM" },
        { id: 3, type: "sent", message: "Thanks, I appreciate it.", time: "Monday, 10:31 AM" }
      ]
    },
    {
      id: 20,
      name: "Mia Perez",
      image: img,
      lastMessage: "Got it! Thanks!",
      lastMessageTime: "Sunday",
      message: [
        { id: 1, type: "received", message: "I've updated the schedule as requested. Let me know if you need anything else.", time: "Sunday, 7:30 PM" },
        { id: 2, type: "sent", message: "Got it! Thanks for the quick update.", time: "Sunday, 7:45 PM" },
        { id: 3, type: "received", message: "No problem! Have a good evening.", time: "Sunday, 7:46 PM" }
      ]
    }
];
