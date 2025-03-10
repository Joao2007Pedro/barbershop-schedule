# **📖 Sistema de Agendamento para Barbearia**

## **📌 1. Visão Geral do Projeto**

Este sistema permite que **clientes agendem horários**, **barbeiros gerenciem seus horários**, e **administradores controlem os agendamentos** de forma eficiente.

### **⚙️ Funcionalidades principais**

✅ Cadastro e login de clientes e barbeiros com JWT (JSON Web Token)  
✅ Listagem de horários disponíveis  
✅ Agendamento e cancelamento de serviços  
✅ Dashboard administrativo para gerenciar usuários e agendamentos  
✅ Notificações por e-mail para confirmação de agendamentos  
✅ Suporte para múltiplos barbeiros e serviços  

---

## **🛠 2. Tecnologias Utilizadas**

### **Backend**

- Node.js + Express.js
- MySQL (queries diretas, sem Sequelize)
- JWT para autenticação
- Nodemailer para envio de e-mails
- Docker para containerização

### **Frontend**

- React.js + React Router
- Axios para comunicação com API
- Tailwind CSS para estilização
- Context API para gerenciamento de estado

---

## **📂 3. Estrutura de Pastas**

```bash
📁 barbershop-system
├── 📁 backend
│   ├── 📁 config/      # Configurações (Banco de Dados, JWT, etc.)
│   ├── 📁 controllers/ # Lógica das requisições
│   ├── 📁 routes/      # Rotas da API
│   ├── 📁 services/    # Serviços auxiliares (e-mails, notificações)
│   ├── 📄 server.js    # Ponto de entrada do backend
│   ├── 📄 database.js  # Conexão com MySQL
│   ├── 📄 package.json # Dependências do backend
│
├── 📁 frontend
│   ├── 📁 components/  # Componentes reutilizáveis
│   ├── 📁 pages/       # Páginas do sistema
│   ├── 📁 services/    # Comunicação com API (Axios)
│   ├── 📄 App.js       # Configuração principal do React
│   ├── 📄 package.json # Dependências do frontend
```

---

## **🛢️ 4. Estrutura do Banco de Dados (MySQL)**

```sql
CREATE DATABASE barbershop;
USE barbershop;

-- Tabela de Usuários (Clientes e Barbeiros)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('cliente', 'barbeiro', 'admin') NOT NULL DEFAULT 'cliente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Barbeiros
CREATE TABLE barbers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabela de Serviços
CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    duration INT NOT NULL COMMENT 'Duração em minutos',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Agendamentos
CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    barber_id INT NOT NULL,
    service_id INT NOT NULL,
    appointment_date DATETIME NOT NULL,
    status ENUM('pendente', 'confirmado', 'cancelado') DEFAULT 'pendente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (barber_id) REFERENCES barbers(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

```

---

## **📌 5. API Endpoints**

### **1️⃣ Autenticação (Auth)**

#### 🔹 **Criar conta**

```http
POST /api/auth/register
{
  "name": "João",
  "email": "joao@email.com",
  "password": "123456",
  "role": "cliente"
}
```

#### 🔹 **Login**

```http
POST /api/auth/login
{
  "email": "joao@email.com",
  "password": "123456"
}
```

### **2️⃣ Agendamentos**

#### 🔹 **Criar um agendamento**

```http
POST /api/appointments
Headers: { "Authorization": "Bearer jwt_token" }
Body: {
  "barber_id": 2,
  "service_id": 1,
  "date": "2024-07-10T14:00:00"
}
```

#### 🔹 **Listar agendamentos do usuário**

```http
GET /api/appointments
Headers: { "Authorization": "Bearer jwt_token" }
```

#### 🔹 **Cancelar agendamento**

```http
DELETE /api/appointments/:id
Headers: { "Authorization": "Bearer jwt_token" }
```

---

## **🚀 6. Considerações Finais**

Esse sistema foi projetado para ser escalável e flexível, permitindo futuras melhorias, como:

✅ **Envio de e-mails com confirmação de agendamento (Nodemailer)**  
✅ **Notificações em tempo real (Socket.IO)**  
✅ **Integração com API de pagamento**  
✅ **Dashboard com estatísticas de agendamentos**  

Isso garante que o sistema possa evoluir conforme necessário! 🔥

