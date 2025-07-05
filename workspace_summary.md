# BC Website - Workspace Summary

## Overview
This workspace contains a .NET 6.0 MVC web application called "BCWebsite" - a standard ASP.NET Core web application with a traditional MVC architecture.

## Project Structure

### Core Application Files
- **BCWebsite.csproj**: .NET 6.0 web SDK project file with nullable references enabled
- **BCWebsite.sln**: Visual Studio solution file
- **Program.cs**: Main entry point configuring the web application with MVC pattern and default routing
- **Dockerfile**: Container configuration for Linux deployment
- **.dockerignore**: Docker ignore patterns

### Configuration Files
- **appsettings.json**: Application settings with logging configuration
- **appsettings.Development.json**: Development-specific settings
- **Properties/launchSettings.json**: Development server configuration
  - IIS Express: localhost:15393 (HTTP), port 44322 (HTTPS)
  - Kestrel: localhost:5066 (HTTP), localhost:7066 (HTTPS)
  - Docker support included

### MVC Components

#### Controllers
- **HomeController.cs**: Main controller with three actions:
  - `Index()`: Home page
  - `Privacy()`: Privacy policy page
  - `Error()`: Error handling with ErrorViewModel

#### Models
- **ErrorViewModel.cs**: Simple error model for request tracking

#### Views
- **Views/Home/**:
  - `Index.cshtml`: Homepage view
  - `Privacy.cshtml`: Privacy policy view
- **Views/Shared/**:
  - `_Layout.cshtml`: Main layout template
  - `_Layout.cshtml.css`: Layout-specific CSS
  - `_ValidationScriptsPartial.cshtml`: Client-side validation scripts
  - `Error.cshtml`: Error page template
- **_ViewImports.cshtml**: Global view imports
- **_ViewStart.cshtml**: View initialization

### Static Assets (wwwroot)
- **CSS**: Custom site.css with basic styling
- **JavaScript**: Custom site.js with minimal functionality
- **Third-party Libraries**:
  - Bootstrap (UI framework)
  - jQuery (JavaScript library)
  - jQuery Validation & Unobtrusive validation
- **favicon.ico**: Website icon

### Development & Deployment
- **Git**: Version control configured (.git, .gitignore, .gitattributes)
- **Docker**: Full containerization support with multi-stage builds
- **HTTPS**: SSL/TLS configured for secure development
- **User Secrets**: Configured for secure development settings

## Application Features
- Standard MVC web application structure
- Responsive Bootstrap UI
- Client-side validation
- Error handling and logging
- HTTPS redirection
- Static file serving
- Docker containerization ready

## Development Environment
- Target Framework: .NET 6.0
- Development URLs: HTTP (5066), HTTPS (7066)
- Docker support with Linux containers
- IIS Express integration available

This is a minimal but complete ASP.NET Core MVC web application template, ready for development and deployment.