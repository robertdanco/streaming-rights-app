# Contributing to Sports Viewing Finder

Thank you for your interest in contributing to the Sports Viewing Finder project! This document provides guidelines for contributions.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR-USERNAME/streaming-rights-app`
3. Create a feature branch: `git checkout -b feature-name`
4. Make your changes
5. Submit a pull request

## Development Setup

### Frontend Development
```bash
cd sports-viewing-app
pnpm install
pnpm run dev
```

### Backend Development
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## Code Style

### Frontend
- Follow ESLint configuration
- Use Prettier for formatting
- Follow React best practices

### Backend
- Follow PEP 8 guidelines
- Use Black for formatting
- Use isort for import sorting

## Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Include both unit and integration tests

## Pull Request Process

1. Update documentation for any changes
2. Add tests for new features
3. Ensure CI/CD pipeline passes
4. Request review from maintainers

## Code Review

- Be respectful and constructive
- Focus on code quality and maintainability
- Address review comments promptly

## Community

- Be welcoming to newcomers
- Follow our code of conduct
- Help others when possible

Thank you for contributing!