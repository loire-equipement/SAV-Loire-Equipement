// firebase-messaging-sw.js
// Service Worker - Loire Equipement SAV Pro
// Ce fichier DOIT etre a la racine du depot GitHub

importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBbu3_7jIyV3jLOorLENYWHUljBRzxqtEc",
  authDomain: "sav-63e64.firebaseapp.com",
  databaseURL: "https://sav-63e64-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sav-63e64",
  storageBucket: "sav-63e64.firebasestorage.app",
  messagingSenderId: "52674947338",
  appId: "1:52674947338:web:98801a71c0fdb5efe272f3"
});

var messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  var n = payload.notification || {};
  self.registration.showNotification(n.title || 'Loire Equipement', {
    body: n.body || 'Nouvelle intervention',
    icon: 'https://loire-equipement.github.io/SAV-Loire-Equipement/icon.png',
    requireInteraction: true,
    vibrate: [200, 100, 200],
    tag: 'sav-notif',
    data: { url: 'https://loire-equipement.github.io/SAV-Loire-Equipement/' }
  });
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  var url = 'https://loire-equipement.github.io/SAV-Loire-Equipement/';
  event.waitUntil(
    clients.matchAll({type:'window',includeUncontrolled:true}).then(function(cls) {
      for (var i=0; i<cls.length; i++) {
        if ('focus' in cls[i]) { cls[i].focus(); return; }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});

self.addEventListener('install', function(e) { self.skipWaiting(); });
self.addEventListener('activate', function(e) { e.waitUntil(clients.claim()); });
