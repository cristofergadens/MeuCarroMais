# Firebase Setup Guide - RevisaCar

## 🚀 **Passo a Passo para Configurar Firebase**

### **1. Criar Projeto Firebase**

1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Clique em "Criar projeto"
3. Digite o nome: `revisacar-app`
4. Desabilite Google Analytics (opcional)
5. Clique em "Criar projeto"

### **2. Configurar Autenticação**

1. No console Firebase, vá em "Authentication"
2. Clique em "Get started"
3. Vá na aba "Sign-in method"
4. Habilite "Email/Password"
5. Clique em "Save"

### **3. Configurar Firestore Database**

1. No console Firebase, vá em "Firestore Database"
2. Clique em "Create database"
3. Escolha "Start in test mode"
4. Escolha a localização mais próxima (ex: us-central1)
5. Clique em "Done"

### **4. Configurar Android**

1. No console Firebase, clique no ícone Android
2. Digite o package name: `com.revisacar.app`
3. Digite o nickname: `RevisaCar Android`
4. Clique em "Register app"
5. Baixe o arquivo `google-services.json`
6. Coloque o arquivo em `android/app/google-services.json`

### **5. Configurar iOS (Opcional)**

1. No console Firebase, clique no ícone iOS
2. Digite o bundle ID: `com.revisacar.app`
3. Digite o nickname: `RevisaCar iOS`
4. Clique em "Register app"
5. Baixe o arquivo `GoogleService-Info.plist`
6. Adicione ao projeto iOS via Xcode

### **6. Configurar Gradle (IMPORTANTE)**

#### **android/build.gradle**
Adicione o plugin do Google Services:

```gradle
buildscript {
  repositories {
    google()
    mavenCentral()
  }
  dependencies {
    classpath('com.android.tools.build:gradle')
    classpath('com.facebook.react:react-native-gradle-plugin')
    classpath('org.jetbrains.kotlin:kotlin-gradle-plugin')
    classpath('com.google.gms:google-services:4.4.0') // Adicione esta linha
  }
}
```

#### **android/app/build.gradle**
Adicione o plugin do Google Services:

```gradle
apply plugin: "com.android.application"
apply plugin: "org.jetbrains.kotlin.android"
apply plugin: "com.facebook.react"
apply plugin: "com.google.gms.google-services" // Adicione esta linha
```

### **7. Configurar Inicialização no App**

#### **App.tsx**
```typescript
import React, { useEffect } from 'react';
import AppNavigator from './src/navigation';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { AuthProvider } from './src/contexts/AuthContext';
import StatusBar from './src/components/StatusBar';
import { initializeFirebase } from './src/services/firebase';

export default function App() {
  useEffect(() => {
    // Inicializar Firebase
    initializeFirebase();
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <StatusBar />
        <AppNavigator />
      </ThemeProvider>
    </AuthProvider>
  );
}
```

#### **src/services/firebase.ts**
```typescript
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';

export const firebase = {
  auth,
  firestore,
  messaging,
};

// Configuração inicial do Firebase
export const initializeFirebase = () => {
  try {
    // Verificar se o Firebase já foi inicializado
    const app = getApp();
    console.log('Firebase já inicializado:', app.name);
  } catch (error) {
    console.log('Firebase será inicializado automaticamente');
  }
};
```

### **8. Regras do Firestore**

No console Firebase, vá em "Firestore Database" > "Rules" e configure:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuários só podem acessar seus próprios dados
    match /vehicles/{vehicleId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

### **9. Testar a Configuração**

1. Execute o app: `npx expo run:android`
2. Tente criar uma conta
3. Tente fazer login
4. Verifique se os dados aparecem no Firestore

## 🔧 **Arquivos de Configuração**

### **google-services.json (Android)**
```json
{
  "project_info": {
    "project_number": "123456789",
    "project_id": "revisacar-app",
    "storage_bucket": "revisacar-app.appspot.com"
  },
  "client": [
    {
      "client_info": {
        "mobilesdk_app_id": "1:123456789:android:abc123def456",
        "android_client_info": {
          "package_name": "com.revisacar.app"
        }
      },
      "oauth_client": [],
      "api_key": [
        {
          "current_key": "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        }
      ],
      "services": {
        "appinvite_service": {
          "other_platform_oauth_client": []
        }
      }
    }
  ],
  "configuration_version": "1"
}
```

### **GoogleService-Info.plist (iOS)**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>API_KEY</key>
    <string>AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</string>
    <key>GCM_SENDER_ID</key>
    <string>123456789</string>
    <key>PLIST_VERSION</key>
    <string>1</string>
    <key>BUNDLE_ID</key>
    <string>com.revisacar.app</string>
    <key>PROJECT_ID</key>
    <string>revisacar-app</string>
    <key>STORAGE_BUCKET</key>
    <string>revisacar-app.appspot.com</string>
    <key>IS_ADS_ENABLED</key>
    <false></false>
    <key>IS_ANALYTICS_ENABLED</key>
    <false></false>
    <key>IS_APPINVITE_ENABLED</key>
    <true></true>
    <key>IS_GCM_ENABLED</key>
    <true></true>
    <key>IS_SIGNIN_ENABLED</key>
    <true></true>
    <key>GOOGLE_APP_ID</key>
    <string>1:123456789:ios:abc123def456</string>
</dict>
</plist>
```

## 🧪 **Testando**

### **1. Criar Conta**
- Abra o app
- Clique em "Não tem uma conta? Cadastre-se"
- Preencha os dados
- Clique em "Criar Conta"

### **2. Fazer Login**
- Digite email e senha
- Clique em "Entrar"

### **3. Verificar Dados**
- No console Firebase, vá em "Firestore Database"
- Verifique se os dados aparecem na coleção "vehicles"

## 🚨 **Problemas Comuns**

### **Erro: "No Firebase App '[DEFAULT]' has been created"**
**Solução:**
1. Verifique se o `google-services.json` está em `android/app/google-services.json`
2. Verifique se o plugin do Google Services está configurado no `build.gradle`
3. Limpe o cache: `npx expo start --clear`
4. Reconstrua o projeto: `npx expo run:android`

### **Erro: "Permission denied"**
- Verifique as regras do Firestore
- Certifique-se de que a autenticação está habilitada

### **Erro: "Network request failed"**
- Verifique a conexão com a internet
- Verifique se o projeto Firebase está ativo

### **Erro: "Warning: This method is deprecated"**
- Este é um aviso sobre a API antiga do Firebase
- O código já foi atualizado para usar a nova API
- Pode ser ignorado se o app estiver funcionando

## 📱 **Próximos Passos**

1. **Notificações Push** - Configurar FCM
2. **Analytics** - Habilitar Firebase Analytics
3. **Crashlytics** - Monitoramento de crashes
4. **Performance** - Monitoramento de performance
5. **Hosting** - Deploy do app web (se necessário)

## 🔄 **Migração para Firebase v22+**

O projeto foi atualizado para usar a nova API do Firebase (v22+). As principais mudanças:

1. **Uso de `getApp()`** em vez de `firebase.app()`
2. **Tipagem melhorada** com `FirebaseAuthTypes`
3. **Inicialização automática** quando o plugin está configurado corretamente

### **Comandos para Limpar e Reconstruir:**

```bash
# Limpar cache do Metro
npx expo start --clear

# Limpar cache do Gradle
cd android && ./gradlew clean && cd ..

# Reconstruir o projeto
npx expo run:android
```

## 🔒 **Segurança dos Arquivos Firebase**

### **⚠️ IMPORTANTE: NÃO COMMITAR ARQUIVOS SENSÍVEIS**

Os seguintes arquivos **NÃO** devem ser commitados no Git:

- `android/app/google-services.json`
- `ios/GoogleService-Info.plist`

### **Por que não commitar?**

1. **Contém chaves de API** que podem ser usadas para acessar seu projeto
2. **Informações do projeto** que podem expor dados sensíveis
3. **Configurações específicas** que podem variar entre ambientes

### **Como configurar para outros desenvolvedores:**

1. **Crie um arquivo de exemplo:**
   - `google-services.json.example`
   - `GoogleService-Info.plist.example`

2. **Adicione ao .gitignore:**
   ```gitignore
   # Firebase
   google-services.json
   GoogleService-Info.plist
   ```

3. **Instruções para novos desenvolvedores:**
   ```bash
   # Copie o arquivo de exemplo
   cp google-services.json.example android/app/google-services.json
   
   # Edite com suas próprias configurações do Firebase
   # Baixe o arquivo real do console Firebase
   ```

### **Para produção:**

1. **Use variáveis de ambiente** para configurações sensíveis
2. **Configure CI/CD** para injetar configurações automaticamente
3. **Use diferentes projetos Firebase** para desenvolvimento e produção 