import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import GenericIntroduction from './components/GenericIntroduction';
import GenericCourse from './components/GenericCourse';

import confetti from 'canvas-confetti';
import {
  Terminal, Cpu, Layout, Globe, Code2, Palette, Box,
  ChevronRight, User, Eye, EyeOff, ArrowLeft, X, BookOpen,
  Sparkles, Server, Database, Coffee, FileCode, Figma,
  Settings, LogOut, Award, BarChart, Camera, Search, Heart,
  Moon, Sun, Bell, Menu, Home, TrendingUp, Share2, Volume2, VolumeX,
  ChevronLeft, CheckCircle, Circle, Star, Trophy, Clock, Calendar,
  Edit3, Mail, Lock, Save, Play, ArrowDown,
  Type, Code, Terminal as TerminalIcon, Users, Bookmark, Filter
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// --- Composants locaux ---
import MysteriousGeometricLogo from './MysteriousGeometricLogo';
import CyberPet from './CyberPet';
import Particles from './Particles';
import Dashboard from './components/Dashboard';
import AIAssistant from './components/AIAssistant';

// --- Import des pages de présentation et de cours pour chaque langage ---
import CIntroduction from './courses/c/CIntroduction';
import CCourse from './courses/c/CCourse';

import AlgoIntroduction from './courses/algo/AlgoIntroduction';
import AlgoCourse from './courses/algo/AlgoCourse';
// --- Données des cours (pour le tableau de bord) ---
import { coursesData } from './courses/data.jsx';

// --- Hooks personnalisés ---
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) { }
  };
  return [storedValue, setValue];
};

// --- Configuration API ---
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

// --- Composant Toast ---
const Toast = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  const bgColor = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600';
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-50 ${bgColor} text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2`}
    >
      {message}
      <button onClick={onClose} className="ml-2"><X size={16} /></button>
    </motion.div>
  );
};

// --- Composant SearchBar ---
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-3 text-gray-500" size={20} />
      <input
        type="text"
        placeholder="Rechercher un cours..."
        value={query}
        onChange={handleChange}
        className="w-full bg-gray-800/50 border border-gray-700 rounded-full py-2 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

// --- Composant MobileMenu ---
const MobileMenu = ({ isOpen, onClose, setCurrentView, user }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween' }}
            className="fixed top-0 left-0 h-full w-64 bg-gray-900 z-50 p-6"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400"><X /></button>
            {user && (
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700">
                {user.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user.firstName?.charAt(0).toUpperCase()}{user.lastName?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-bold">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>
            )}
            <nav className="flex flex-col gap-4">
              <button onClick={() => { setCurrentView('dashboard'); onClose(); }} className="text-white hover:text-blue-400 text-left flex items-center gap-2">
                <Home size={18} /> Tableau de bord
              </button>
              <button onClick={() => { setCurrentView('account'); onClose(); }} className="text-white hover:text-blue-400 text-left flex items-center gap-2">
                <User size={18} /> Mon compte
              </button>
              <button onClick={() => { setCurrentView('landing'); onClose(); }} className="text-white hover:text-blue-400 text-left flex items-center gap-2">
                <LogOut size={18} /> Déconnexion
              </button>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Composant CourseCard ---
const CourseCard = ({ item, onSelect, isFavorite, onToggleFavorite, progress }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(item)}
      className="p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl hover:border-blue-500/50 transition-all cursor-pointer group relative"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 bg-gray-900 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${item.color}`}>
          {item.icon}
        </div>
        <div className="flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(item.id); }}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <Heart size={20} fill={isFavorite ? '#ef4444' : 'none'} stroke={isFavorite ? '#ef4444' : 'currentColor'} />
          </button>
        </div>
      </div>

      <h4 className="text-xl font-bold mb-1">{item.name}</h4>
      <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
        <span className="px-2 py-1 bg-gray-700 rounded-full">{item.level}</span>
        <span className="flex items-center gap-1"><User size={12} /> {item.students}</span>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">{item.desc}</p>

      {/* Barre de progression */}
      <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-right text-xs text-gray-500 mt-1">{progress}%</p>

      <ChevronRight className="absolute bottom-6 right-6 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
    </motion.div>
  );
};

// --- Composant Account ---
const AccountView = ({ user, onUpdateUser, onLogout, onBack, progressions, favorites, onToggleFavorite, onSelectCourse, initialTab = 'profile' }) => {
  const [isEditing, setIsEditing] = useState(false);
  // Helper to get first/last name from user.name if separate fields don't exist
  const getNames = (u) => {
    if (!u) return { first: '', last: '' };
    if (u.firstName && u.lastName) return { first: u.firstName, last: u.lastName };
    const parts = (u.name || '').split(' ');
    return { first: parts[0] || '', last: parts.slice(1).join(' ') || '' };
  };

  const initialNames = getNames(user);
  const [editedFirstName, setEditedFirstName] = useState(initialNames.first);
  const [editedLastName, setEditedLastName] = useState(initialNames.last);
  const [editedEmail, setEditedEmail] = useState(user?.email || '');

  // Sync state when user prop changes
  useEffect(() => {
    const names = getNames(user);
    setEditedFirstName(names.first);
    setEditedLastName(names.last);
    setEditedEmail(user?.email || '');
  }, [user]);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [progressData, setProgressData] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useLocalStorage('notifications', false);
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);

  // Sync progression from real data
  useEffect(() => {
    const allProgress = Object.values(progressions || {});
    const totalCompleted = allProgress.reduce((sum, p) => sum + (p.completedLessons?.length || 0), 0);
    const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    // Distribute completed lessons across the week proportionally
    const data = days.map((name, i) => ({
      name,
      value: Math.max(0, Math.round((totalCompleted / 7) * (0.5 + Math.random())))
    }));
    // Ensure non-zero if there's progress
    if (totalCompleted > 0 && data.every(d => d.value === 0)) {
      data[data.length - 1].value = totalCompleted;
    }
    setProgressData(data);
  }, [progressions]);

  const completedCourses = Object.values(progressions || {}).filter(p => p.progress === 100).length;

  const stats = [
    { label: 'Cours complétés', value: completedCourses.toString(), icon: <Trophy />, color: 'text-yellow-500' },
    { label: 'Heures apprises', value: '0h', icon: <Clock />, color: 'text-blue-500' },
    { label: 'Jours de suite', value: '0', icon: <Calendar />, color: 'text-green-500' },
    { label: 'Badges', value: '0', icon: <Star />, color: 'text-purple-500' },
  ];

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const avatarBase64 = reader.result;
        try {
          const response = await fetch(`${API_URL}/auth/profile`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({ avatar: avatarBase64 }),
          });
          if (response.ok) {
            const updatedUser = await response.json();
            onUpdateUser(updatedUser);
          }
        } catch (err) {
          console.error(err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name: `${editedFirstName} ${editedLastName}`.trim(),
          email: editedEmail
        }),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        onUpdateUser(updatedUser);
        setIsEditing(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleNotifications = async () => {
    if (!notificationsEnabled) {
      if (notificationPermission !== 'granted') {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);
        if (permission === 'granted') {
          setNotificationsEnabled(true);
          new Notification('Mysterious Learn', {
            body: 'Les notifications sont activées ! Vous recevrez des rappels.',
            icon: '/logo.svg'
          });
        } else {
          alert('Vous devez autoriser les notifications dans les paramètres de votre navigateur.');
        }
      } else {
        setNotificationsEnabled(true);
        new Notification('Mysterious Learn', {
          body: 'Les notifications sont activées !',
          icon: '/logo.svg'
        });
      }
    } else {
      setNotificationsEnabled(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 pt-20">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
          <span>Retour au tableau de bord</span>
        </button>
      </div>

      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-8 mb-8 border border-white/10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-blue-500">
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </div>
              )}
            </div>
            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition border-2 border-white">
              <Camera size={16} />
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </label>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold">{user?.firstName} {user?.lastName}</h1>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
              >
                <Edit3 size={18} />
              </button>
            </div>
            <p className="text-gray-400 mb-4">{user?.email}</p>
            <p className="text-sm text-gray-500">Membre depuis {new Date(user?.joinedAt).toLocaleDateString('fr-FR')}</p>
          </div>

          <button
            onClick={onLogout}
            className="px-6 py-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition flex items-center gap-2"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>

        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-white/10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Prénom</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-500" size={18} />
                    <input
                      type="text"
                      value={editedFirstName}
                      onChange={(e) => setEditedFirstName(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Nom</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-500" size={18} />
                    <input
                      type="text"
                      value={editedLastName}
                      onChange={(e) => setEditedLastName(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
                    <input
                      type="email"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <Save size={18} />
                  Enregistrer
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center">
            <div className={`flex justify-center mb-2 ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-6 border-b border-white/10">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 font-medium transition ${activeTab === 'profile' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
        >
          Profil
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`px-4 py-2 font-medium transition ${activeTab === 'progress' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
        >
          Progression
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 font-medium transition ${activeTab === 'settings' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
        >
          Paramètres
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          className={`px-4 py-2 font-medium transition ${activeTab === 'favorites' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
        >
          Favoris
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Informations personnelles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400 mb-1">Prénom</p>
                <p className="font-medium">{user?.firstName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Nom</p>
                <p className="font-medium">{user?.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Membre depuis</p>
                <p className="font-medium">{new Date(user?.joinedAt).toLocaleDateString('fr-FR')}</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'progress' && (
          <motion.div
            key="progress"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Progression cette semaine</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: '#222', border: 'none' }} />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {activeTab === 'favorites' && (
          <motion.div
            key="favorites"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Star className="text-yellow-500 fill-yellow-500" size={24} />
              Mes Favoris
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursesData.flatMap(cat => cat.items).filter(item => favorites.includes(item.id)).length > 0 ? (
                coursesData.flatMap(cat => cat.items).filter(item => favorites.includes(item.id)).map((course, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onSelectCourse(course);
                      onBack();
                    }}
                    className="bg-gray-900/60 p-6 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all cursor-pointer group relative overflow-hidden"
                  >
                    <div className="absolute top-4 right-4 z-20">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(course.id);
                        }}
                        className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-full transition-all border border-red-500/20"
                        title="Retirer des favoris"
                      >
                        <Heart size={14} fill="currentColor" />
                      </button>
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-[50px] group-hover:bg-blue-500/10 transition-all" />
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gray-800/50 ${course.color}`}>
                        {course.icon}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {course.level}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors uppercase italic tracking-tight">{course.name}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{course.desc}</p>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <Bookmark className="mx-auto mb-4 text-gray-600" size={48} />
                  <p className="text-gray-400">Aucun cours en favoris pour le moment.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Paramètres</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl">
                <div>
                  <h3 className="font-medium">Notifications</h3>
                  <p className="text-sm text-gray-400">Recevoir des rappels</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationsEnabled}
                    onChange={toggleNotifications}
                  />
                  <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Composant Background Interactif ---
const MouseGradientBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className="absolute w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] transition-transform duration-100 ease-out will-change-transform mix-blend-screen"
        style={{
          transform: `translate(${mousePos.x - 400}px, ${mousePos.y - 400}px)`,
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] animate-pulse"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </div>
  );
};

// --- Composant Marquee de Cours ---
const InfiniteCourseMarquee = () => {
  const allCourses = Object.values(coursesData).flatMap((cat) => cat.items);
  // Quadrupler pour être sûr qu'il y en a assez pour le loop
  const marqueeItems = [...allCourses, ...allCourses, ...allCourses, ...allCourses];

  return (
    <div className="w-full overflow-hidden py-12 mt-12 bg-gray-900/30 backdrop-blur-sm border-y border-white/5 relative z-10">
      <motion.div
        className="flex gap-8"
        animate={{ x: [0, -320 * allCourses.length] }}
        transition={{
          x: { repeat: Infinity, repeatType: "loop", duration: 60, ease: "linear" }
        }}
      >
        {marqueeItems.map((course, idx) => (
          <div key={`${course.id}-${idx}`} className="flex-shrink-0 w-80 p-6 bg-gray-800/40 rounded-3xl border border-white/5 hover:border-blue-500/50 hover:bg-gray-800/80 transition-all group cursor-pointer">
            <div className={`p-4 rounded-2xl w-fit mb-4 ${course.color} bg-gray-900/50 shadow-inner group-hover:scale-110 transition-transform`}>{course.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{course.name}</h3>
            <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">{course.desc}</p>
            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-blue-300">
              <span className="px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20">{course.level}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// --- Composant Landing amélioré ---
const LandingPage = ({ setCurrentView }) => {
  const [stats] = useState([
    { label: 'Cours disponibles', value: '24', icon: <BookOpen /> },
    { label: 'Utilisateurs actifs', value: '12k+', icon: <User /> },
    { label: 'Heures de contenu', value: '150+', icon: <Clock /> },
    { label: 'Communauté', value: '5k+', icon: <Users /> },
  ]);

  const handleStartClick = () => {
    setCurrentView('auth');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0f172a]">
      <MouseGradientBackground />

      {/* Dynamic Background Particles */}
      <div className="absolute inset-0 z-0">
        <Particles />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full pt-20">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: 'spring', stiffness: 100 }}
        >
          <MysteriousGeometricLogo className="w-48 h-48 mb-10 drop-shadow-[0_0_35px_rgba(59,130,246,0.5)]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-8 text-center px-4 glow-text brand-font"
          style={{ letterSpacing: "0.08em" }}
        >
          MYSTERIOUS CLASSROOM
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-blue-200 font-medium tracking-[0.3em] text-xs md:text-sm mb-12 uppercase text-center max-w-lg leading-loose"
        >
          Le code n'a jamais été aussi fascinant.
          <br />
          <span className="text-purple-400">Plongez dans l'expérience immersive.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 px-6"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
              <div className="text-blue-400 flex justify-center mb-2">{stat.icon}</div>
              <div className="text-3xl font-black text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 font-mono mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(59, 130, 246, 0.7)" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStartClick}
          className="px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-2xl flex items-center gap-3 text-lg z-20 glow-pulse brand-font-secondary"
        >
          <Play fill="currentColor" /> COMMENCER L'AVENTURE
        </motion.button>

        {/* Course Marquee Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="w-full mt-12"
        >
          <InfiniteCourseMarquee />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="my-12 text-gray-500 text-xs font-mono"
        >
          ✨ Déjà plus de 12 000 apprenants connectés au réseau ✨
        </motion.div>
      </div>
    </div>
  );
};

// --- Composant Politique de Confidentialité ---
const PrivacyModal = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      className="bg-gray-900 border border-gray-700 p-8 rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"><X size={20} /></button>
      <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Politique de Confidentialité</h2>

      <div className="space-y-4 text-gray-300 leading-relaxed">
        <p className="font-semibold text-white text-lg">Votre confiance est notre priorité absolue.</p>
        <p>Chez <strong>Mysterious Classroom</strong>, nous croyons en une transparence totale et une sécurité sans faille. En acceptant cette politique, vous rejoignez une communauté d'élite basée sur le respect et l'apprentissage.</p>

        <h3 className="text-xl font-bold text-white mt-6">1. Collecte de Données</h3>
        <p>Nous collectons uniquement les informations nécessaires à votre progression : votre nom, email et votre avancement dans les cours. Google gère l'authentification sécurisée pour simplifier votre accès.</p>

        <h3 className="text-xl font-bold text-white mt-6">2. Usage des Données</h3>
        <p>Vos données servent exclusivement à personnaliser votre expérience d'apprentissage. Nous ne vendons, ne louons et ne partageons <strong>jamais</strong> vos informations avec des tiers.</p>

        <h3 className="text-xl font-bold text-white mt-6">3. Sécurité</h3>
        <p>Toutes vos données sont chiffrées et stockées sur des serveurs sécurisés. Nous utilisons les standards de l'industrie pour protéger votre identité numérique.</p>

        <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500/30 rounded-xl">
          <p className="text-blue-200 text-sm ml-2 flex items-center gap-2">
            <CheckCircle size={16} /> En cochant la case, vous confirmez votre confiance en notre mission éducative.
          </p>
        </div>
      </div>

      <button onClick={onClose} className="mt-8 w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/20 transition-all">
        J'ai compris et je fais confiance
      </button>
    </motion.div>
  </motion.div>
);

// --- Composant principal App ---
// --- Hook Konami Code ---
const useKonami = (callback) => {
  useEffect(() => {
    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let position = 0;
    const handler = (e) => {
      const key = e.key;
      if (key === konami[position]) {
        position++;
        if (position === konami.length) {
          callback();
          position = 0;
        }
      } else {
        position = 0;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [callback]);
};

// --- Composant principal App ---
function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [authMode, setAuthMode] = useState('signin');
  const [user, setUser] = useLocalStorage('user', null);
  const [selectedLang, setSelectedLang] = useState(null);
  const [courseView, setCourseView] = useState('presentation'); // 'presentation' ou 'room'
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [petSecret, setPetSecret] = useState(null);
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [toast, setToast] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [courses] = useState(coursesData);
  const [progressions, setProgressions] = useState({});
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState('');
  const [verifyCode, setVerifyCode] = useState(['', '', '', '', '', '']);
  const [verifyError, setVerifyError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [lastSelectedCourse, setLastSelectedCourse] = useLocalStorage('lastSelectedCourse', null);
  const [accountTab, setAccountTab] = useState('profile');

  const handleAIAction = (action, data) => {
    switch (action) {
      case 'NAVIGATE_SETTINGS':
        setAccountTab('settings');
        setCurrentView('account');
        break;
      case 'NAVIGATE_DASHBOARD':
        setSelectedLang(null);
        setCourseView('presentation');
        setCurrentView('dashboard');
        break;
      case 'OPEN_COURSE':
        if (data) {
          const course = coursesData.flatMap(cat => cat.items).find(c =>
            c.id === data.toLowerCase() || c.name.toLowerCase().includes(data.toLowerCase())
          );
          if (course) {
            setSelectedLang(course);
            setCourseView('presentation');
            setCurrentView('dashboard');
          }
        }
        break;
      default:
        break;
    }
  };


  const fetchProgressions = useCallback(async () => {
    if (!user || !user.token) return;
    try {
      const response = await fetch(`${API_URL}/courses/progress/all`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const progObj = {};
        data.forEach(p => {
          progObj[p.courseId] = {
            completedLessons: p.completedLessons,
            progress: p.progress,
          };
        });
        setProgressions(progObj);
      }
    } catch (err) {
      console.error(err);
    }
  }, [user]);

  // Initialisation Google Identity Services
  useEffect(() => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response) => {
          try {
            setToast({ message: 'Authentification Google en cours...', type: 'info' });
            const res = await fetch(`${API_URL}/auth/google`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ credential: response.credential }),
            });
            const data = await res.json();
            if (res.ok) {
              const enhanced = { ...data, firstName: data.name.split(' ')[0], lastName: data.name.split(' ').slice(1).join(' ') };
              setUser(enhanced);
              setCurrentView('profilePreview');
              fetchProgressions();
              setToast({ message: `Bienvenue, ${enhanced.firstName} !`, type: 'success' });
            } else {
              setAuthError(data.message || 'Échec de la connexion Google');
              setToast({ message: data.message || 'Erreur Google', type: 'error' });
            }
          } catch (err) {
            setAuthError('Erreur réseau lors de la connexion Google');
            setToast({ message: 'Erreur réseau Google', type: 'error' });
          }
        },
      });

      // Rendre le bouton si la vue auth est active
      if (currentView === 'auth') {
        const checkBtn = setInterval(() => {
          const btnParent = document.getElementById('google-btn-parent');
          if (btnParent) {
            window.google.accounts.id.renderButton(btnParent, {
              theme: 'filled_white',
              size: 'large',
              shape: 'pill',
              width: btnParent.offsetWidth,
              text: authMode === 'signin' ? 'signin_with' : 'signup_with',
            });
            clearInterval(checkBtn);
          }
        }, 100);
        return () => clearInterval(checkBtn);
      }
    }
  }, [currentView, authMode, fetchProgressions]);

  // Synchronisation du formulaire avec l'utilisateur pour l'aperçu du profil
  useEffect(() => {
    if (user && currentView === 'profilePreview') {
      setFormData(prev => {
        // On n'initialise que si les champs sont vides ou si on vient d'entrer dans la vue
        // On vérifie si formData est "neuf" par rapport à l'utilisateur
        if (!prev.firstName && !prev.lastName && !prev.email) {
          return {
            ...prev,
            firstName: user.firstName || user.name?.split(' ')[0] || '',
            lastName: user.lastName || (user.name?.split(' ').length > 1 ? user.name.split(' ').slice(1).join(' ') : '') || '',
            email: user.email || '',
          };
        }
        return prev;
      });
    }
  }, [user, currentView]);

  useEffect(() => {
    if (user && user.token && currentView === 'landing') {
      setCurrentView('dashboard');
      fetchProgressions();
    }
  }, [user, currentView, fetchProgressions]);

  useEffect(() => {
    if (user && user.token) {
      fetchProgressions();
    }
  }, [user, fetchProgressions]);

  useKonami(() => {
    setKonamiActivated(true);
    setToast({ message: '🎮 KONAMI CODE ACTIVÉ !', type: 'success' });
    setPetSecret({ type: 'konami' });
  });

  useEffect(() => {
    const pwd = formData.password.toLowerCase();
    if (pwd.includes('magic')) {
      setToast({ message: '✨ Mode magique activé !', type: 'info' });
      setPetSecret({ type: 'magic' });
    } else if (pwd.includes('cyberpet')) {
      setToast({ message: '🐾 Le CyberPet sort sa langue !', type: 'info' });
      setPetSecret({ type: 'cyberpet' });
    } else if (pwd.includes('secret')) {
      setToast({ message: '🔮 Secret débloqué !', type: 'info' });
      setPetSecret({ type: 'magic' });
    } else if (pwd.includes('blush')) {
      setToast({ message: '😊 Le CyberPet rougit !', type: 'info' });
      setPetSecret({ type: 'blush' });
    } else if (pwd.includes('delete')) {
      setToast({ message: '🗑️ Nettoyage effectué !', type: 'info' });
      setPetSecret({ type: 'delete' });
    } else {
      setPetSecret(null);
    }
  }, [formData.password]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        handleUpdateUser(data);
        setVerifyEmail(formData.email);
        setCurrentView('verifyEmail');
        setToast({ message: 'Un code de vérification a été envoyé à ton email !', type: 'info' });
      } else {
        setAuthError(data.message || 'Erreur lors de l\'inscription');
      }
    } catch (err) {
      console.error(err);
      setAuthError('Erreur réseau');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        handleUpdateUser(data);
        if (data.lastSelectedCourse) setLastSelectedCourse(data.lastSelectedCourse);
        setCurrentView('dashboard');
        fetchProgressions();
      } else if (response.status === 403 && data.needsVerification) {
        setVerifyEmail(data.email);
        setCurrentView('verifyEmail');
        setToast({ message: data.message, type: 'info' });
      } else {
        setAuthError(data.message || 'Email ou mot de passe incorrect');
      }
    } catch (err) {
      console.error(err);
      setAuthError('Erreur réseau');
    }
  };

  const handleAuth = authMode === 'signup' ? handleRegister : handleLogin;

  const handleUpdateProfile = async () => {
    if (!user || !user.token) return;
    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        handleUpdateUser(data);
        setToast({ message: 'Profil mis à jour !', type: 'success' });
      } else {
        setToast({ message: data.message || 'Erreur lors de la mise à jour', type: 'error' });
      }
    } catch (err) {
      console.error(err);
      setToast({ message: 'Erreur réseau', type: 'error' });
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
    setFormData({ firstName: '', lastName: '', email: '', password: '' });
    setProgressions({});
    // setToast({ message: 'Déconnexion réussie', type: 'info' });
  };

  const handleUpdateUser = (updatedData) => {
    if (!updatedData) return;
    const name = updatedData.name || '';
    const firstName = updatedData.firstName || name.split(' ')[0] || '';
    const lastName = updatedData.lastName || (name.split(' ').length > 1 ? name.split(' ').slice(1).join(' ') : '') || '';

    // Synchroniser les favoris si présents dans les données du serveur
    if (updatedData.favorites) {
      setFavorites(updatedData.favorites);
    }

    // On fusionne avec l'utilisateur actuel pour garder le token et les autres infos non retournées
    setUser(prev => ({
      ...prev,
      ...updatedData,
      firstName,
      lastName
    }));
  };

  const toggleFavorite = (courseId) => {
    const newFavorites = favorites.includes(courseId)
      ? favorites.filter(id => id !== courseId)
      : [...favorites, courseId];

    setFavorites(newFavorites);
    setToast({ message: 'Favori mis à jour', type: 'info' });

    if (user?.token) {
      fetch(`${API_URL}/auth/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({ favorites: newFavorites }),
      }).catch(() => { });
    }
  };

  const handleLessonComplete = async (courseId, lessonId) => {
    if (!user || !user.token) return;

    const course = courses.flatMap(c => c.items).find(c => c.id === courseId);
    if (!course) return;

    const totalLessons = course.lessons.length;

    try {
      const response = await fetch(`${API_URL}/courses/${courseId}/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ lessonId, totalLessons }),
      });
      if (response.ok) {
        const updated = await response.json();
        setProgressions(prev => ({
          ...prev,
          [courseId]: {
            completedLessons: updated.completedLessons,
            progress: updated.progress,
          },
        }));
        if (updated.progress === 100) {
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          setToast({ message: `Félicitations ! Cours ${course.name} terminé !`, type: 'success' });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filteredCourses = useMemo(() => {
    if (!searchQuery) return courses;
    const lowerQuery = searchQuery.toLowerCase();
    return courses
      .map(cat => ({
        ...cat,
        items: cat.items.filter(item =>
          item.name.toLowerCase().includes(lowerQuery) ||
          item.desc.toLowerCase().includes(lowerQuery)
        )
      }))
      .filter(cat => cat.items.length > 0);
  }, [searchQuery, courses]);

  const extendedCourses = useMemo(() => {
    if (!konamiActivated) return filteredCourses;
    return [
      ...filteredCourses,
      {
        category: "🥷 Cours Secret",
        items: [
          {
            id: 'hack',
            name: "Hacking Éthique",
            icon: <Sparkles />,
            color: "text-pink-500",
            desc: "Sécurité offensive (usage légal).",
            longDesc: "Découvre les bases de la sécurité informatique, les techniques de test d'intrusion et comment protéger les systèmes.",
            code: "# Ce cours est réservé aux initiés\nprint('Bravo, tu as débloqué le cours secret !')",
            level: "Expert",
            students: 123,
            lessons: [
              { id: 'hack1', title: "Reconnaissance", duration: "30 min" },
              { id: 'hack2', title: "Exploitation", duration: "45 min" },
              { id: 'hack3', title: "Post-exploitation", duration: "35 min" },
            ]
          },
        ]
      }
    ];
  }, [filteredCourses, konamiActivated]);

  const favoriteCourses = useMemo(() => {
    return courses.flatMap(cat => cat.items).filter(item => favorites.includes(item.id));
  }, [courses, favorites]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white">
      <Particles theme="dark" />

      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        {showPrivacyModal && <PrivacyModal onClose={() => setShowPrivacyModal(false)} />}
      </AnimatePresence>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        setCurrentView={setCurrentView}
        user={user}
      />

      <AIAssistant key={user?.id || 'guest'} user={user} currentView={currentView} onAction={handleAIAction} />

      {currentView !== 'landing' && user && (
        <nav className="p-4 border-b border-gray-800 bg-gray-900/80 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition">
                <Menu />
              </button>
              <div
                className="hidden md:flex items-center gap-3 cursor-pointer group"
                onClick={() => setCurrentView('landing')}
              >
                <MysteriousGeometricLogo className="w-8 h-8 group-hover:rotate-180 transition-transform duration-700" />
                <span className="font-black text-lg tracking-tighter bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent brand-font" style={{ fontSize: '1rem' }}>
                  MYSTERIOUS CLASSROOM
                </span>
              </div>
            </div>

            <div className="flex-1 max-w-md mx-4">
              <SearchBar onSearch={setSearchQuery} />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentView('account')}
                className="flex items-center gap-2 hover:bg-gray-800 px-3 py-2 rounded-lg transition"
              >
                <span className="text-sm font-medium hidden md:block">{user.firstName} {user.lastName}</span>
                {user.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover border-2 border-blue-500" />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                  </div>
                )}
              </button>
            </div>
          </div>
        </nav>
      )}

      <main className="relative z-10">
        {currentView === 'landing' && (
          <LandingPage setCurrentView={setCurrentView} />
        )}

        {currentView === 'auth' && (
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-lg border border-gray-700 p-8 rounded-[2.5rem] flex flex-col items-center shadow-2xl">
              <CyberPet isPasswordFocused={isPasswordFocused} onSecret={petSecret} />
              <h2 className="text-2xl font-bold text-white mb-6">
                {authMode === 'signin' ? 'Connexion' : 'Inscription'}
              </h2>

              {/* Google Button */}
              {/* Google Button Container */}
              <div id="google-btn-parent" className="w-full mb-6 min-h-[44px]"></div>

              <div className="flex items-center gap-4 w-full mb-6">
                <div className="h-px bg-gray-700 flex-1"></div>
                <span className="text-gray-500 text-sm">OU</span>
                <div className="h-px bg-gray-700 flex-1"></div>
              </div>

              <form onSubmit={handleAuth} className="w-full space-y-4">
                {authMode === 'signup' && (
                  <>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-gray-500" size={20} />
                      <input
                        type="text"
                        placeholder="Prénom"
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-2xl py-3 pl-10 pr-4 text-white focus:border-blue-500 outline-none transition"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        onFocus={() => setIsPasswordFocused(false)}
                        required
                      />
                    </div>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-gray-500" size={20} />
                      <input
                        type="text"
                        placeholder="Nom"
                        className="w-full bg-gray-900/50 border border-gray-700 rounded-2xl py-3 pl-10 pr-4 text-white focus:border-blue-500 outline-none transition"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        onFocus={() => setIsPasswordFocused(false)}
                        required
                      />
                    </div>
                  </>
                )}
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-2xl py-3 pl-10 pr-4 text-white focus:border-blue-500 outline-none transition"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setIsPasswordFocused(false)}
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-500" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mot de passe"
                    required
                    className="w-full bg-gray-900/50 border border-gray-700 rounded-2xl py-3 pl-10 pr-12 text-white focus:border-blue-500 outline-none transition"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3 text-gray-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="flex items-start gap-3 mt-4">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      required
                      checked={agreedToPolicy}
                      onChange={(e) => setAgreedToPolicy(e.target.checked)}
                      className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-600 bg-gray-900/50 transition-all checked:border-blue-500 checked:bg-blue-500"
                      id="privacy-check"
                    />
                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                      <CheckCircle size={12} />
                    </span>
                  </div>
                  <label htmlFor="privacy-check" className="text-sm text-gray-400 cursor-pointer select-none">
                    J'accepte la <button type="button" onClick={() => setShowPrivacyModal(true)} className="text-blue-400 hover:underline font-bold">politique de confidentialité</button> et je fais confiance à Mysterious Classroom.
                  </label>
                </div>

                {authError && <p className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded-lg">{authError}</p>}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className={`w-full font-bold py-3 rounded-2xl shadow-lg transition-all ${!agreedToPolicy
                    ? 'bg-gray-600 cursor-not-allowed opacity-50 text-gray-400'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-blue-500/30'
                    }`}
                  disabled={!agreedToPolicy}
                >
                  {authMode === 'signin' ? 'Se connecter' : 'S\'inscrire'}
                </motion.button>
              </form>
              <p className="mt-4 text-sm text-gray-500">
                {authMode === 'signin' ? "Pas encore de compte ?" : "Déjà un compte ?"}
                <button
                  onClick={() => { setAuthMode(authMode === 'signin' ? 'signup' : 'signin'); setAuthError(''); }}
                  className="ml-1 text-blue-400 hover:underline"
                >
                  {authMode === 'signin' ? 'Inscris-toi' : 'Connecte-toi'}
                </button>
              </p>
              <p className="text-xs text-gray-600 text-center mt-4">
                Essaie "magic", "secret", "blush", "delete" dans le mot de passe ✨
              </p>
            </div>
          </div>
        )}

        {currentView === 'dashboard' && user && (
          <>
            {/* Affichage de la présentation du langage sélectionné */}
            {selectedLang && courseView === 'presentation' && (
              (() => {
                switch (selectedLang.id) {
                  case 'c':
                    return <CIntroduction onStart={() => setCourseView('room')} onBack={() => { setSelectedLang(null); setCourseView('presentation'); }} />;
                  case 'algo':
                    return <AlgoIntroduction onStart={() => setCourseView('room')} onBack={() => { setSelectedLang(null); setCourseView('presentation'); }} />;
                  default:
                    return <GenericIntroduction course={selectedLang} onStart={() => setCourseView('room')} onBack={() => { setSelectedLang(null); setCourseView('presentation'); }} />;
                }
              })()
            )}

            {/* Affichage du cours détaillé */}
            {selectedLang && courseView === 'room' && (
              (() => {
                switch (selectedLang.id) {
                  case 'c':
                    return <CCourse onClose={() => { setSelectedLang(null); setCourseView('presentation'); }} completedLessons={progressions[selectedLang.id]?.completedLessons || []} onLessonComplete={handleLessonComplete} />;
                  case 'algo':
                    return <AlgoCourse onClose={() => { setSelectedLang(null); setCourseView('presentation'); }} completedLessons={progressions[selectedLang.id]?.completedLessons || []} onLessonComplete={handleLessonComplete} />;
                  default:
                    return <GenericCourse course={selectedLang} onClose={() => { setSelectedLang(null); setCourseView('presentation'); }} completedLessons={progressions[selectedLang.id]?.completedLessons || []} onLessonComplete={handleLessonComplete} />;
                }
              })()
            )}

            {/* Tableau de bord */}
            {!selectedLang && (
              <Dashboard
                user={user}
                courses={extendedCourses}
                favorites={favorites}
                onSelectCourse={(item) => {
                  setSelectedLang(item);
                  setCourseView('presentation');
                  setLastSelectedCourse(item.id);
                  // Save to backend
                  if (user?.token) {
                    fetch(`${API_URL}/auth/profile`, {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
                      body: JSON.stringify({ lastSelectedCourse: item.id }),
                    }).catch(() => { });
                  }
                }}
                toggleFavorite={toggleFavorite}
                progressions={progressions}
                lastSelectedCourse={lastSelectedCourse}
              />
            )}
          </>
        )}

        {currentView === 'account' && user && (
          <AccountView
            user={user}
            onUpdateUser={handleUpdateUser}
            onLogout={handleLogout}
            onBack={() => setCurrentView('dashboard')}
            progressions={progressions}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onSelectCourse={(item) => {
              setSelectedLang(item);
              setCourseView('presentation');
              setLastSelectedCourse(item.id);
              if (user?.token) {
                fetch(`${API_URL}/auth/profile`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
                  body: JSON.stringify({ lastSelectedCourse: item.id }),
                }).catch(() => { });
              }
            }}
            initialTab={accountTab}
          />
        )}

        {/* Email Verification View */}
        {currentView === 'verifyEmail' && (
          <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-gray-800/50 backdrop-blur-lg border border-gray-700 p-8 rounded-[2.5rem] flex flex-col items-center shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                <Mail size={36} />
              </div>
              <h2 className="text-2xl font-bold mb-2">Vérifie ton email</h2>
              <p className="text-gray-400 text-sm text-center mb-6">Un code à 6 chiffres a été envoyé à <span className="text-blue-400 font-bold">{verifyEmail}</span></p>
              <div className="flex gap-2 mb-6">
                {verifyCode.map((digit, idx) => (
                  <input key={idx} type="text" maxLength="1" className="code-input" value={digit}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      const newCode = [...verifyCode]; newCode[idx] = val; setVerifyCode(newCode);
                      if (val && idx < 5) e.target.nextElementSibling?.focus();
                    }}
                    onKeyDown={(e) => { if (e.key === 'Backspace' && !digit && idx > 0) e.target.previousElementSibling?.focus(); }}
                  />
                ))}
              </div>
              {verifyError && <p className="text-red-500 text-sm mb-4 bg-red-500/10 p-2 rounded-lg">{verifyError}</p>}
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                onClick={async () => {
                  const code = verifyCode.join('');
                  if (code.length !== 6) { setVerifyError('Entre le code complet'); return; }
                  try {
                    const res = await fetch(`${API_URL}/auth/verify-email`, {
                      method: 'POST', headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email: verifyEmail, code }),
                    });
                    const data = await res.json();
                    if (res.ok) {
                      const enhanced = { ...user, ...data, firstName: data.name.split(' ')[0], lastName: data.name.split(' ').slice(1).join(' ') };
                      setUser(enhanced);
                      setToast({ message: 'Email vérifié ! Bienvenue !', type: 'success' });
                      setCurrentView('profilePreview');
                    } else { setVerifyError(data.message); }
                  } catch { setVerifyError('Erreur réseau'); }
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-2xl shadow-lg mb-4"
              >Vérifier</motion.button>
              <button disabled={resendCooldown > 0}
                onClick={async () => {
                  try {
                    await fetch(`${API_URL}/auth/resend-verification`, {
                      method: 'POST', headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email: verifyEmail }),
                    });
                    setToast({ message: 'Nouveau code envoyé !', type: 'info' });
                    setResendCooldown(60);
                    const interval = setInterval(() => setResendCooldown(p => { if (p <= 1) { clearInterval(interval); return 0; } return p - 1; }), 1000);
                  } catch { }
                }}
                className="text-sm text-blue-400 hover:underline disabled:text-gray-600 disabled:no-underline"
              >{resendCooldown > 0 ? `Renvoyer (${resendCooldown}s)` : 'Renvoyer le code'}</button>
            </motion.div>
          </div>
        )}

        {/* Profile Preview View */}
        {currentView === 'profilePreview' && user && (
          <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a0f18]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-lg bg-gray-900/80 backdrop-blur-2xl border border-white/10 p-10 rounded-[3rem] flex flex-col items-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

              <div className="relative group mb-8">
                <div className="w-32 h-32 rounded-full border-4 border-blue-500/30 overflow-hidden bg-gray-800 flex items-center justify-center shadow-xl group-hover:border-blue-500 transition-colors">
                  {user.avatar ? (
                    <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" onError={(e) => { e.target.src = ''; e.target.parentElement.innerHTML = '<div class="text-4xl text-blue-500">👤</div>'; }} />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold">{user.firstName?.charAt(0)}{user.lastName?.charAt(0)}</div>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-full border-4 border-gray-900 shadow-lg cursor-pointer hover:bg-blue-500 transition-colors">
                  <Camera size={18} />
                </div>
              </div>

              <h2 className="text-3xl font-black mb-2 text-white uppercase tracking-tighter">Paramètres du Profil</h2>
              <p className="text-gray-400 mb-8 text-sm text-center">Vérifie et complète tes informations avant de commencer.</p>

              <div className="w-full space-y-4 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-2">Prénom</label>
                    <input
                      type="text"
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-2xl p-4 text-white focus:outline-none focus:border-blue-500 transition-all font-medium"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-2">Nom</label>
                    <input
                      type="text"
                      className="w-full bg-gray-800/50 border border-gray-700/50 rounded-2xl p-4 text-white focus:outline-none focus:border-blue-500 transition-all font-medium"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-2">Email</label>
                  <input
                    type="email"
                    className="w-full bg-gray-800/50 border border-gray-700/50 rounded-2xl p-4 text-white focus:outline-none focus:border-blue-500 transition-all font-medium"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="w-full mb-8">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${agreedToPolicy ? 'bg-blue-600 border-blue-600' : 'border-gray-600 group-hover:border-blue-500'}`}
                    onClick={() => setAgreedToPolicy(!agreedToPolicy)}>
                    {agreedToPolicy && <CheckCircle size={14} className="text-white" />}
                  </div>
                  <span className="text-sm text-gray-400">
                    J'accepte la <span className="text-blue-400 hover:underline cursor-pointer font-bold" onClick={(e) => { e.stopPropagation(); setShowPrivacyModal(true); }}>politique de confidentialité</span>
                  </span>
                </label>
              </div>

              <motion.button
                whileHover={agreedToPolicy ? { scale: 1.02 } : {}}
                whileTap={agreedToPolicy ? { scale: 0.98 } : {}}
                onClick={async () => {
                  if (!agreedToPolicy) {
                    setToast({ message: "Tu dois accepter la politique de confidentialité.", type: 'error' });
                    return;
                  }
                  await handleUpdateProfile();
                  setCurrentView('dashboard');
                  fetchProgressions();
                }}
                disabled={!agreedToPolicy}
                className={`w-full py-4 text-white font-bold rounded-2xl shadow-lg text-lg flex items-center justify-center gap-3 transition-all ${agreedToPolicy ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-blue-500/25 glow-pulse cursor-pointer' : 'bg-gray-700 cursor-not-allowed grayscale'}`}
              >
                <Play fill="currentColor" size={20} /> Entrer dans Mysterious Classroom
              </motion.button>

              <button
                onClick={handleLogout}
                className="mt-6 text-gray-500 hover:text-red-400 transition-colors text-sm flex items-center gap-2"
              >
                <LogOut size={14} /> Se déconnecter
              </button>
            </motion.div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-20 py-12 border-t border-gray-800 bg-gray-900/30 backdrop-blur-md text-center">
          <div className="mb-6">
            <Typewriter text="MYSTERIOUS CLASSROOM" />
          </div>
          <p className="text-gray-500 text-xs tracking-widest uppercase font-medium">
            &copy; 2026 Mysterious Classroom. All rights reserved.
            <span className="block mt-2 text-blue-500/50 font-bold">Created with passion by Mouhamed Fall</span>
          </p>
        </footer>
      </main>
    </div>
  );
}

// --- Composant Typewriter pour le footer ---
const Typewriter = ({ text }) => {
  const characters = Array.from(text);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex justify-center flex-wrap gap-x-1"
    >
      {characters.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, scale: 0.5, filter: 'blur(10px)' },
            visible: {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              transition: {
                delay: i * 0.08,
                duration: 0.5,
                ease: "easeOut"
              }
            }
          }}
          animate={{
            opacity: [1, 0.4, 1],
            filter: ['blur(0px)', 'blur(2px)', 'blur(0px)'],
            scale: [1, 0.95, 1],
            textShadow: [
              '0 0 20px rgba(59, 130, 246, 0.5)',
              '0 0 40px rgba(139, 92, 246, 0.7)',
              '0 0 20px rgba(59, 130, 246, 0.5)'
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.1 + 1, // Start looping after initial reveal
            ease: "easeInOut"
          }}
          className="brand-font text-2xl md:text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent italic tracking-tighter drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default App;