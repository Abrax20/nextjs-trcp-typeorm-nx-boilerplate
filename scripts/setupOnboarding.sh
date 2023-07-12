echo "Installing Homebrew..."
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/$LOGNAME/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

echo "\n\nInstalling Docker-Desktop..."
brew install --cask docker

echo "\n\nInstalling Table Plus..."
brew install --cask tableplus

echo "\n\nInstalling cfssl..."
brew install cfssl

echo "\n\nInstalling git-lfs..."
brew install git-lfs

echo "\n\nInstalling ngrok..."
brew install ngrok

echo "\n\nInstalling Insomnia.."
brew install --cask insomnia

echo "\n\nInstalling nvm..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

if ! grep -q "export NVM_DIR" "${HOME}/.zshrc"; then
    echo 'export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> ~/.zshrc
fi

source ~/.zshrc

echo "\n\nInstalling node.js..."
nvm install v16.16.0

echo "\n\nInstalling yarn..."
npm install -g yarn
