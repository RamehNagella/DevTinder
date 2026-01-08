# Setup Guide for DevTinder Project

## 📦 Step 1: Install Dependencies

**You MUST run this first!** When you clone a project from GitHub, the `node_modules` folder is not included (it's in `.gitignore`).

```bash
npm install
```

This will:
- Read `package.json` and `package-lock.json`
- Download and install all dependencies listed in `package.json`
- Create the `node_modules` folder with all required packages

**Time required**: 1-3 minutes depending on your internet speed

---

## ⚙️ Step 2: Create Environment Variables File

The project requires a `.env` file with the following variables:

Create a file named `.env` in the root directory (`/home/ramesh-nagella/Documents/tinder/DevTinder/.env`):

```env
# Database Connection (MongoDB)
DB_CONNECTION_SECRET=mongodb://localhost:27017/devtinder
# OR for MongoDB Atlas:
# DB_CONNECTION_SECRET=mongodb+srv://username:password@cluster.mongodb.net/devtinder

# JWT Secret Key (use a strong random string)
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production

# Server Port
PORT=7777

# AWS SES Credentials (Optional - for email functionality)
# AWS_ACCESS_KEY=your-aws-access-key
# AWS_SECRET_KEY=your-aws-secret-key
# AWS_REGION=us-east-1
```

**Important Notes:**
- Replace `DB_CONNECTION_SECRET` with your actual MongoDB connection string
- Replace `JWT_SECRET` with a strong random string (you can generate one using: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- Make sure MongoDB is running if using local MongoDB
- The `.env` file should NOT be committed to Git (it should be in `.gitignore`)

---

## 🚀 Step 3: Start the Application

After installing dependencies and creating the `.env` file:

```bash
npm start
```

Or for development with auto-reload (if you have nodemon installed globally):

```bash
npm run dev
```

---

## ✅ Complete Setup Checklist

- [ ] Install Node.js 18.x (LTS) - Check with: `node --version`
- [ ] Run `npm install` to install all dependencies
- [ ] Create `.env` file with required environment variables
- [ ] Make sure MongoDB is running (if using local MongoDB)
- [ ] Run `npm start` to start the server
- [ ] Check console for "Database connection established..." and "server connected successfully..."

---

## 🔧 Troubleshooting

### Error: "Cannot find module 'express'"
**Solution**: You haven't run `npm install` yet. Run it first.

### Error: "Cannot connect database!"
**Solution**: 
- Check your MongoDB connection string in `.env`
- Make sure MongoDB is running
- Verify `DB_CONNECTION_SECRET` is correct

### Error: "Port 7777 is already in use"
**Solution**: 
- Change `PORT` in `.env` to a different port (e.g., 3000, 5000)
- Or stop the process using port 7777

### Error: "JWT_SECRET is not defined"
**Solution**: Make sure you have `JWT_SECRET` in your `.env` file

---

## 📝 Quick Start Commands

```bash
# 1. Install dependencies (ONE TIME ONLY)
npm install

# 2. Create .env file (see template above)

# 3. Start the server
npm start
```

---

## 🎯 Summary

**Answer to your question**: 
- ❌ **NO**, you cannot directly run `npm start` 
- ✅ **YES**, you need to run `npm install` first to install all packages
- ✅ Then create `.env` file with required environment variables
- ✅ Then you can run `npm start`

The `package-lock.json` file you have ensures that the exact same versions of packages will be installed, which is good for consistency!
