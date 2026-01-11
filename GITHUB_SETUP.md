# 🚀 GitHub Pages Deployment Guide

This guide will help you deploy your Dart Score Tracker to GitHub Pages so you can access it from anywhere on your phone or computer. Don't worry if you've never used GitHub before - we'll explain everything step by step!

## 📚 What You'll Learn

By the end of this guide, you'll have:
- Your app hosted on the internet for free
- A URL you can access from any device
- The ability to update your app anytime

## 🎯 Overview: What is GitHub Pages?

**GitHub** is a website where developers store their code. Think of it like Google Drive, but specifically designed for code projects.

**GitHub Pages** is a free feature that turns your code into a live website that anyone can visit. It's perfect for our dart tracker because:
- It's completely free
- Your app gets a URL like `yourusername.github.io/dart-tracker`
- It updates automatically when you change your code
- It works on all devices

---

## 📋 Prerequisites

Before we start, you need:
1. A GitHub account (free) - we'll create one together if you don't have it
2. Your dart tracker files in a folder
3. Git installed on your computer (we'll guide you through this)

---

## Part 1: Setting Up GitHub Account

### Step 1: Create a GitHub Account

**What is it?** GitHub is where we'll store your app files and make them available on the internet.

1. Go to [github.com](https://github.com)
2. Click the "Sign up" button (top right corner)
3. Enter your email address
4. Create a password (make it strong!)
5. Choose a username (this will be in your app's URL)
   - Example: If you choose "dartmaster123", your app URL will be `dartmaster123.github.io/dart-tracker`
6. Complete the verification
7. Click "Create account"
8. Verify your email address

**Tip:** Choose a username you're happy with - changing it later will change your app's URL!

---

## Part 2: Installing Git

### What is Git?

**Git** is a tool that helps you manage your code files and upload them to GitHub. Think of it like a super-powered "Save" button that also uploads your files.

### For Windows Users:

1. Download Git from [git-scm.com](https://git-scm.com/download/win)
2. Run the installer
3. Use all default settings (just keep clicking "Next")
4. Click "Finish"

### For Mac Users:

1. Open Terminal (find it in Applications → Utilities)
2. Type this command and press Enter:
   ```bash
   git --version
   ```
3. If Git isn't installed, macOS will prompt you to install it
4. Click "Install" and follow the prompts

### For Linux Users:

Open Terminal and run:
```bash
sudo apt-get update
sudo apt-get install git
```

### Verify Git Installation

1. Open Command Prompt (Windows) or Terminal (Mac/Linux)
2. Type: `git --version`
3. You should see something like: `git version 2.40.0`

If you see a version number, Git is installed! 🎉

---

## Part 3: Configuring Git (First Time Only)

**What is this?** We're telling Git who you are so it can track your changes.

1. Open Command Prompt (Windows) or Terminal (Mac/Linux)
2. Run these commands, replacing the example info with yours:

```bash
git config --global user.name "Your Name"
git config --global user.email "youremail@example.com"
```

**Example:**
```bash
git config --global user.name "John Doe"
git config --global user.email "john.doe@email.com"
```

**Important:** Use the same email you used for your GitHub account!

---

## Part 4: Method 1 - Using GitHub Website (Easiest)

This method is perfect if you want the simplest way to get started. No command line needed!

### Step 1: Create a New Repository

**What is a repository?** Think of it as a folder on GitHub where your app files will live.

1. Log in to [github.com](https://github.com)
2. Click the "+" button in the top right corner
3. Select "New repository"
4. Fill in the details:
   - **Repository name:** `dart-tracker` (or any name you like)
   - **Description:** "Professional dart score tracking app"
   - **Public:** Keep it selected (so GitHub Pages works)
   - **Add README:** Leave unchecked (we already have one)
5. Click "Create repository"

### Step 2: Upload Your Files

1. On your new repository page, click "uploading an existing file"
2. Drag and drop all your files:
   - index.html
   - style.css
   - app.js
   - README.md
   - GITHUB_SETUP.md
3. Add a commit message: "Initial commit - Dart Tracker app"
   - **What's a commit message?** A short note describing what you changed
4. Click "Commit changes"

### Step 3: Enable GitHub Pages

1. In your repository, click "Settings" (top menu)
2. Scroll down and click "Pages" in the left sidebar
3. Under "Source", select:
   - **Branch:** main (or master)
   - **Folder:** / (root)
4. Click "Save"
5. Wait 1-2 minutes
6. Refresh the page
7. You'll see: "Your site is published at https://yourusername.github.io/dart-tracker/"

**That's it!** Click the link to see your app live! 🎉

---

## Part 5: Method 2 - Using Command Line (More Control)

This method gives you more control and is faster once you learn it.

### Step 1: Navigate to Your Project Folder

**What does navigate mean?** It means going to the folder where your dart tracker files are located.

1. Open Command Prompt (Windows) or Terminal (Mac/Linux)
2. Use the `cd` command to go to your folder:

**Windows example:**
```bash
cd C:\Users\YourName\Documents\dart-tracker
```

**Mac/Linux example:**
```bash
cd ~/Documents/dart-tracker
```

**Tip:** You can drag the folder onto the Terminal window to auto-fill the path!

### Step 2: Initialize Git Repository

**What does initialize mean?** Setting up Git in your folder so it can track your files.

```bash
git init
```

You should see: `Initialized empty Git repository in...`

### Step 3: Add Your Files

**What does this do?** Prepares all your files to be uploaded.

```bash
git add .
```

The `.` means "add all files in this folder"

### Step 4: Create Your First Commit

**What's a commit?** A saved snapshot of your files with a description.

```bash
git commit -m "Initial commit - Dart Tracker app"
```

The `-m` means "message" and the text in quotes is your description.

### Step 5: Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click the "+" button → "New repository"
3. Name it `dart-tracker`
4. Keep it Public
5. **Don't** check any boxes
6. Click "Create repository"

### Step 6: Connect Your Local Folder to GitHub

**What does this do?** Links your computer's folder to the online GitHub repository.

GitHub will show you commands. Copy them, but here's what they look like:

```bash
git remote add origin https://github.com/yourusername/dart-tracker.git
git branch -M main
git push -u origin main
```

**Replace `yourusername` with your actual GitHub username!**

**What do these commands mean?**
- `remote add origin`: Tells Git where to upload files (your GitHub repo)
- `branch -M main`: Names your main code branch "main"
- `push`: Uploads your files to GitHub

### Step 7: Enable GitHub Pages

Same as Method 1, Step 3:
1. Go to repository Settings → Pages
2. Select branch: main
3. Click Save
4. Wait 1-2 minutes and refresh

Your app is now live! 🎊

---

## Part 6: Creating a Personal Access Token (If Needed)

**When do you need this?** If GitHub asks for a password when you push, and your regular password doesn't work.

**What is it?** A special password specifically for Git that's more secure than your regular password.

### Steps to Create Token:

1. Go to [github.com](https://github.com) and log in
2. Click your profile picture (top right)
3. Click "Settings"
4. Scroll down and click "Developer settings" (bottom left)
5. Click "Personal access tokens" → "Tokens (classic)"
6. Click "Generate new token" → "Generate new token (classic)"
7. Name it: "Dart Tracker Git Access"
8. Set expiration: "90 days" (or longer)
9. Check these boxes:
   - ✅ repo (all sub-boxes)
   - ✅ workflow
10. Scroll down and click "Generate token"
11. **IMPORTANT:** Copy the token immediately and save it somewhere safe
    - You'll never see it again!
    - Treat it like a password

### Using Your Token:

When Git asks for your password, use the token instead of your GitHub password.

**For Windows:** Git will remember it after first use
**For Mac:** It will be saved in Keychain
**For Linux:** May need to use credential helper

---

## Part 7: Making Updates to Your App

After your app is live, here's how to update it:

### Using GitHub Website:

1. Go to your repository on github.com
2. Click on the file you want to edit
3. Click the pencil icon (edit)
4. Make your changes
5. Scroll down, add a commit message
6. Click "Commit changes"
7. Wait 1-2 minutes for changes to go live

### Using Command Line:

```bash
# 1. Make changes to your files (edit them normally)

# 2. See what changed
git status

# 3. Add the changed files
git add .

# 4. Commit with a message
git commit -m "Updated scoring logic"

# 5. Upload to GitHub
git push
```

Your changes will be live in 1-2 minutes!

---

## 📱 Part 8: Accessing Your App on Mobile

### iPhone:

1. Open Safari
2. Go to your app URL: `https://yourusername.github.io/dart-tracker`
3. Tap the Share button (box with arrow)
4. Tap "Add to Home Screen"
5. Tap "Add"

Now your app appears like a real app on your home screen! 📲

### Android:

1. Open Chrome
2. Go to your app URL
3. Tap the three dots menu (top right)
4. Tap "Add to Home screen"
5. Tap "Add"

---

## 🐛 Troubleshooting

### Problem: "Permission denied" when pushing

**Solution:** You need a Personal Access Token (see Part 6)

### Problem: "Repository not found"

**Solution:**
- Check you spelled the repository name correctly
- Make sure you used your actual username
- Verify the repository exists on GitHub

### Problem: Changes not showing on website

**Solutions:**
- Wait 2-3 minutes (GitHub Pages takes time to update)
- Clear your browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Try opening in incognito/private mode
- Check if your commit actually uploaded to GitHub

### Problem: Git commands not working

**Solutions:**
- Make sure you're in the right folder (`cd` to your project)
- Check Git is installed: `git --version`
- Make sure you initialized Git: `git init`

### Problem: Page shows 404 error

**Solutions:**
- Make sure GitHub Pages is enabled in Settings
- Verify you selected the correct branch (main or master)
- Check that index.html is in the root folder (not in a subfolder)
- Wait a few more minutes

### Problem: CSS/JavaScript not loading

**Solutions:**
- Check all files are uploaded to GitHub
- Verify file names are exactly: `style.css`, `app.js`, `index.html`
- Check file paths in index.html are correct
- Clear browser cache

---

## 📚 Git Command Reference

Here's a quick reference of common Git commands:

| Command | What it does | Example |
|---------|-------------|---------|
| `git init` | Creates a new Git repository | `git init` |
| `git status` | Shows which files changed | `git status` |
| `git add .` | Stages all files for commit | `git add .` |
| `git add filename` | Stages one specific file | `git add style.css` |
| `git commit -m "message"` | Saves changes with description | `git commit -m "Fixed bug"` |
| `git push` | Uploads commits to GitHub | `git push` |
| `git pull` | Downloads latest from GitHub | `git pull` |
| `git log` | Shows history of commits | `git log` |
| `git remote -v` | Shows GitHub repository URL | `git remote -v` |

---

## 🎯 Quick Start Cheat Sheet

For future reference, here's the workflow for making updates:

```bash
# 1. Navigate to your project
cd path/to/dart-tracker

# 2. Make your changes to the files

# 3. Check what changed
git status

# 4. Add all changes
git add .

# 5. Commit with a message
git commit -m "Describe what you changed"

# 6. Push to GitHub
git push

# 7. Wait 1-2 minutes, then check your live site!
```

---

## 🎓 Understanding Git & GitHub (ELI5)

### Git (The Tool on Your Computer)
- Like a super-smart "Save" button
- Tracks every change you make
- Lets you undo mistakes
- Works on your computer

### GitHub (The Website)
- Like Dropbox or Google Drive, but for code
- Stores your code online
- Lets others see and use your code
- Powers GitHub Pages (free website hosting)

### Repository (Repo)
- A folder for your project on GitHub
- Contains all your files
- Has a history of all changes

### Commit
- A saved snapshot of your files
- Like a checkpoint in a video game
- Has a message describing what changed

### Push
- Uploading your commits from your computer to GitHub
- Like syncing to the cloud

### Pull
- Downloading changes from GitHub to your computer
- Like downloading from the cloud

### Branch
- A parallel version of your code
- Like having a draft copy to experiment with
- `main` or `master` is your primary branch

---

## 🌟 Best Practices

### Commit Messages
Write clear messages that explain what you did:
- ✅ Good: "Fixed scoring bug for double bull"
- ✅ Good: "Added new toast notification messages"
- ✅ Good: "Improved mobile layout for small screens"
- ❌ Bad: "Fixed stuff"
- ❌ Bad: "Changes"
- ❌ Bad: "asdf"

### When to Commit
Commit whenever you complete a logical unit of work:
- Fixed a bug
- Added a feature
- Changed styling
- Updated documentation

Don't wait to commit everything at once!

### Before Pushing
1. Test your changes locally
2. Make sure nothing is broken
3. Review what you're committing: `git status`

---

## 🎉 Congratulations!

You now know how to:
- ✅ Create a GitHub account
- ✅ Install and configure Git
- ✅ Upload your app to GitHub
- ✅ Enable GitHub Pages
- ✅ Make updates to your app
- ✅ Access your app from any device

Your Dart Score Tracker is now live on the internet! Share your URL with friends and family, and enjoy tracking your dart games from anywhere! 🎯

---

## 📞 Need More Help?

### Useful Resources:
- [GitHub Docs](https://docs.github.com)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [GitHub Pages Help](https://docs.github.com/en/pages)

### Common Questions:

**Q: Is this really free?**
A: Yes! GitHub and GitHub Pages are completely free for public repositories.

**Q: Can I use a custom domain?**
A: Yes! GitHub Pages supports custom domains. See [GitHub's documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

**Q: How much can I store?**
A: GitHub recommends repositories stay under 1GB. Your dart tracker is tiny (a few KB), so no worries!

**Q: Can I make my repository private?**
A: Yes, but you need GitHub Pro (paid) for private repositories with GitHub Pages.

**Q: Will my game history be shared?**
A: No! Game history is stored locally in your browser, not on GitHub. Each device has its own history.

---

Happy darting! 🎯 May your doubles be true and your app forever available! 🚀
