document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       LOADER INTERSTITIAL ANIMATION
       ========================================== */
    const loaderOverlay = document.getElementById('loader-overlay');
    const loaderText = document.getElementById('loader-text');
    
    const bootMessages = [
        "Initializing Security Protocols...",
        "Loading Entropy Analyzer...",
        "Configuring RNG Pools...",
        "Systems Secured. Welcome to PassGuard."
    ];
    
    let msgIndex = 0;
    const bootInterval = setInterval(() => {
        msgIndex++;
        if (msgIndex < bootMessages.length) {
            loaderText.textContent = bootMessages[msgIndex];
        }
    }, 200);

    setTimeout(() => {
        clearInterval(bootInterval);
        loaderOverlay.classList.add('hidden');
        // Trigger statistics animations once loader is gone
        animateCounters();
    }, 1000);

    /* ==========================================
       TOAST / NOTIFICATION SYSTEM
       ========================================== */
    const toastContainer = document.getElementById('toast-container');

    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let iconSvg = '';
        if (type === 'success') {
            iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 8 12 12 14 14"/></svg>`;
        } else {
            iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
        }

        toast.innerHTML = `
            ${iconSvg}
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('fade-out');
            toast.addEventListener('animationend', () => {
                toast.remove();
            });
        }, 3000);
    }

    /* ==========================================
       DARK / LIGHT MODE TOGGLE
       ========================================== */
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    // Check local storage for theme configuration
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        let theme = 'dark';
        if (document.body.classList.contains('light-theme')) {
            theme = 'light';
            showToast("Light mode activated", "info");
        } else {
            showToast("Dark mode activated", "info");
        }
        
        localStorage.setItem('theme', theme);
    });

    /* ==========================================
       SPA ROUTING / VIEW CONTROLLER
       ========================================== */
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const header = document.getElementById('main-header');
    
    // Updated route mapping: removed About View
    const routeMap = {
        '#home': 'home-view',
        '#checker': 'checker-view',
        '#generator': 'generator-view',
        '#tips': 'tips-view'
    };

    function switchView(targetViewId) {
        sections.forEach(sec => {
            if (sec.id === targetViewId) {
                sec.style.display = 'block';
                sec.style.opacity = '0';
                sec.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    sec.style.transition = 'all 0.4s ease';
                    sec.style.opacity = '1';
                    sec.style.transform = 'translateY(0)';
                }, 50);
            } else {
                sec.style.display = 'none';
            }
        });

        navLinks.forEach(link => {
            if (link.getAttribute('data-target') === targetViewId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function handleHashChange() {
        const hash = window.location.hash || '#home';
        const targetView = routeMap[hash] || 'home-view';
        switchView(targetView);
    }

    window.addEventListener('hashchange', handleHashChange);
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    document.getElementById('hero-cta-btn').addEventListener('click', () => {
        window.location.hash = '#checker';
    });
    
    document.getElementById('hero-secondary-btn').addEventListener('click', () => {
        window.location.hash = '#generator';
    });

    document.getElementById('logo-nav').addEventListener('click', () => {
        window.location.hash = '#home';
    });

    if (window.location.hash) {
        handleHashChange();
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================
       MOBILE RESPONSIVE MENU
       ========================================== */
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    /* ==========================================
       HOMEPAGE STATISTICS COUNTER ANIMATIONS
       ========================================== */
    function animateCounters() {
        const counter1 = document.getElementById('stat-count-1');
        const counter2 = document.getElementById('stat-count-2');
        
        if (!counter1 || !counter2) return;

        animateValue(counter1, 0, parseInt(counter1.getAttribute('data-val')), 1500, '%');
        animateValue(counter2, 0, parseInt(counter2.getAttribute('data-val')), 1500, '%');
    }

    function animateValue(obj, start, end, duration, suffix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start) + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    /* ==========================================
       PASSWORD STRENGTH CHECKER LOGIC
       ========================================== */
    const checkerInput = document.getElementById('password-checker-input');
    const toggleCheckerVisibility = document.getElementById('toggle-checker-visibility');
    const eyeOpenIcon = toggleCheckerVisibility.querySelector('.eye-open-icon');
    const eyeOffIcon = toggleCheckerVisibility.querySelector('.eye-off-icon');
    const analyzeBtn = document.getElementById('analyze-btn');
    const clearBtn = document.getElementById('checker-clear-btn');
    
    const checkerScoreText = document.getElementById('checker-score');
    const checkerProgressBar = document.getElementById('checker-progress-bar');
    const checkerAlert = document.getElementById('checker-alert');
    const checkerAlertStatus = document.getElementById('checker-alert-status');
    const checkerAlertMessage = document.getElementById('checker-alert-message');

    // Breach Warning & Entropy Elements
    const breachWarningCard = document.getElementById('breach-warning-card');
    const entropyScoreDisplay = document.getElementById('entropy-score');
    const entropyClassDisplay = document.getElementById('entropy-class');

    // Checklist elements
    const checkLength = document.getElementById('criterion-length');
    const checkUppercase = document.getElementById('criterion-uppercase');
    const checkLowercase = document.getElementById('criterion-lowercase');
    const checkNumbers = document.getElementById('criterion-numbers');
    const checkSpecials = document.getElementById('criterion-specials');
    const suggestionsList = document.getElementById('checker-suggestions-list');

    // Commonly breached passwords list
    const commonPasswords = [
        '123456',
        '12345678',
        'password',
        'password123',
        'qwerty',
        'admin',
        'welcome',
        'letmein',
        'abc123'
    ];

    // Show/hide visibility
    toggleCheckerVisibility.addEventListener('click', () => {
        if (checkerInput.type === 'password') {
            checkerInput.type = 'text';
            eyeOpenIcon.style.display = 'none';
            eyeOffIcon.style.display = 'block';
        } else {
            checkerInput.type = 'password';
            eyeOpenIcon.style.display = 'block';
            eyeOffIcon.style.display = 'none';
        }
    });

    // Reset Checker field
    clearBtn.addEventListener('click', () => {
        checkerInput.value = '';
        analyzePassword('');
        showToast("Password checker reset.", "info");
    });

    // Analyze button trigger
    analyzeBtn.addEventListener('click', () => {
        const val = checkerInput.value;
        analyzePassword(val);
        showToast("Deep-scan diagnostics complete.", "success");
    });

    // Real-time analysis trigger
    checkerInput.addEventListener('input', (e) => {
        analyzePassword(e.target.value);
    });

    function analyzePassword(password) {
        if (!password) {
            // Reset to defaults
            checkerScoreText.textContent = '0/100';
            checkerScoreText.className = 'score-display neon-text-red';
            checkerProgressBar.style.width = '0%';
            checkerProgressBar.style.backgroundColor = 'var(--neon-red)';
            checkerProgressBar.style.boxShadow = 'none';
            
            checkerAlert.className = 'strength-alert weak';
            checkerAlertStatus.textContent = 'Weak Password';
            checkerAlertMessage.textContent = 'Enter a password above to begin security scanning and analysis.';
            
            breachWarningCard.style.display = 'none';
            entropyScoreDisplay.textContent = '0.0 bits';
            entropyClassDisplay.textContent = 'None';
            entropyClassDisplay.className = 'rating-badge weak';
            
            [checkLength, checkUppercase, checkLowercase, checkNumbers, checkSpecials].forEach(item => {
                item.classList.remove('checked');
            });

            suggestionsList.innerHTML = `
                <li class="suggestion-empty">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 8 12 12 14 14"/></svg>
                    Waiting for password analysis...
                </li>
            `;
            return;
        }

        let score = 0;
        const suggestions = [];

        // Check character types to calculate character pool size R
        let R = 0;
        const hasUpper = /[A-Z]/.test(password);
        if (hasUpper) { R += 26; score += 15; checkUppercase.classList.add('checked'); } 
        else { checkUppercase.classList.remove('checked'); suggestions.push("Add at least one uppercase letter (A-Z)."); }

        const hasLower = /[a-z]/.test(password);
        if (hasLower) { R += 26; score += 15; checkLowercase.classList.add('checked'); } 
        else { checkLowercase.classList.remove('checked'); suggestions.push("Add at least one lowercase letter (a-z)."); }

        const hasNumber = /[0-9]/.test(password);
        if (hasNumber) { R += 10; score += 15; checkNumbers.classList.add('checked'); } 
        else { checkNumbers.classList.remove('checked'); suggestions.push("Add at least one numeric digit (0-9)."); }

        const hasSpecial = /[^A-Za-z0-9]/.test(password);
        if (hasSpecial) { R += 33; score += 15; checkSpecials.classList.add('checked'); } 
        else { checkSpecials.classList.remove('checked'); suggestions.push("Add at least one special symbol (e.g. @, #, $, %)."); }

        // Length evaluation
        const len = password.length;
        if (len >= 12) {
            score += 40;
            checkLength.classList.add('checked');
        } else if (len >= 8) {
            score += 20;
            checkLength.classList.add('checked');
            suggestions.push("Increase length to 12+ characters for military-grade protection.");
        } else {
            checkLength.classList.remove('checked');
            suggestions.push(`Increase length to at least 8 characters (12+ recommended). Currently: ${len}.`);
        }

        // ==========================================
        // BREACH AWARENESS CHECKER
        // ==========================================
        const normalizedPassword = password.trim().toLowerCase();
        const isBreached = commonPasswords.includes(normalizedPassword);

        if (isBreached) {
            breachWarningCard.style.display = 'flex';
            breachWarningCard.classList.add('pulse-border');
            score = Math.min(score, 10); // Severely cap the score if breached
        } else {
            breachWarningCard.style.display = 'none';
            breachWarningCard.classList.remove('pulse-border');
        }

        // ==========================================
        // ENTROPY CALCULATOR
        // ==========================================
        let entropy = 0;
        if (len > 0 && R > 0) {
            entropy = len * Math.log2(R);
        }
        
        entropyScoreDisplay.textContent = `${entropy.toFixed(1)} bits`;

        // Classify entropy
        if (entropy < 40) {
            entropyClassDisplay.textContent = 'Low Entropy';
            entropyClassDisplay.className = 'rating-badge weak';
        } else if (entropy >= 40 && entropy < 60) {
            entropyClassDisplay.textContent = 'Medium Entropy';
            entropyClassDisplay.className = 'rating-badge medium';
        } else {
            entropyClassDisplay.textContent = 'High Entropy';
            entropyClassDisplay.className = 'rating-badge strong';
        }

        // Clip final score bounds
        score = Math.max(0, Math.min(score, 100));

        // Update score display text and progress bar
        checkerScoreText.textContent = `${score}/100`;
        checkerProgressBar.style.width = `${score}%`;

        // Update visual alert level based on score & breach status
        if (isBreached) {
            checkerScoreText.className = 'score-display neon-text-red';
            checkerProgressBar.style.backgroundColor = 'var(--neon-red)';
            checkerProgressBar.style.boxShadow = '0 0 10px rgba(255, 0, 85, 0.5)';
            
            checkerAlert.className = 'strength-alert weak';
            checkerAlert.querySelector('svg').innerHTML = `<polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`;
            checkerAlertStatus.textContent = 'Critical Risk: Breached';
            checkerAlertMessage.textContent = 'Recommendation: Immediately create a stronger, unique password.';
        } else if (score < 40) {
            // Weak
            checkerScoreText.className = 'score-display neon-text-red';
            checkerProgressBar.style.backgroundColor = 'var(--neon-red)';
            checkerProgressBar.style.boxShadow = '0 0 10px rgba(255, 0, 85, 0.4)';
            
            checkerAlert.className = 'strength-alert weak';
            checkerAlert.querySelector('svg').innerHTML = `<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>`;
            checkerAlertStatus.textContent = 'Weak Password';
            checkerAlertMessage.textContent = 'This password is vulnerable to attacks. Enhance length and character types.';
        } else if (score >= 40 && score < 80) {
            // Medium
            checkerScoreText.className = 'score-display neon-text-orange';
            checkerProgressBar.style.backgroundColor = 'var(--neon-orange)';
            checkerProgressBar.style.boxShadow = '0 0 10px rgba(255, 159, 0, 0.4)';
            
            checkerAlert.className = 'strength-alert medium';
            checkerAlert.querySelector('svg').innerHTML = `<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>`;
            checkerAlertStatus.textContent = 'Medium Password';
            checkerAlertMessage.textContent = 'This password provides moderate protection. Add capitals or special symbols to maximize protection.';
        } else {
            // Strong
            checkerScoreText.className = 'score-display neon-text-green';
            checkerProgressBar.style.backgroundColor = 'var(--neon-green)';
            checkerProgressBar.style.boxShadow = '0 0 15px rgba(57, 255, 20, 0.6)';
            
            checkerAlert.className = 'strength-alert strong';
            checkerAlert.querySelector('svg').innerHTML = `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/>`;
            checkerAlertStatus.textContent = 'Strong Password';
            checkerAlertMessage.textContent = 'Excellent! This password is highly secure and offers strong protection against brute-force attempts.';
        }

        // Render Suggestions list
        if (isBreached) {
            suggestionsList.innerHTML = `
                <li class="suggestion-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    <span class="neon-text-red" style="font-weight: 600;">DO NOT USE THIS PASSWORD. Choose a different combination.</span>
                </li>
            `;
        } else if (suggestions.length === 0) {
            suggestionsList.innerHTML = `
                <li class="suggestion-empty">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    All complexity metrics met! Your password is outstanding.
                </li>
            `;
        } else {
            suggestionsList.innerHTML = suggestions.map(sug => `
                <li class="suggestion-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    <span>${sug}</span>
                </li>
            `).join('');
        }
    }

    // Interactive demo triggers
    const demoItems = document.querySelectorAll('.demo-item');
    demoItems.forEach(demo => {
        demo.addEventListener('click', () => {
            const val = demo.getAttribute('data-pass');
            checkerInput.value = val;
            analyzePassword(val);
            checkerInput.focus();
            showToast(`Loaded demo: "${val}" into testing field.`, "info");
        });
    });

    /* ==========================================
       PASSWORD GENERATOR LOGIC
       ========================================== */
    const lengthSlider = document.getElementById('length-slider');
    const lengthValDisplay = document.getElementById('length-val-display');
    const optUpper = document.getElementById('opt-uppercase');
    const optLower = document.getElementById('opt-lowercase');
    const optNumbers = document.getElementById('opt-numbers');
    const optSpecials = document.getElementById('opt-specials');
    
    const genDisplay = document.getElementById('generated-password-display');
    const copyGenBtn = document.getElementById('copy-generated-btn');
    const ratingBadge = document.getElementById('generator-rating-badge');
    const generateBtn = document.getElementById('generate-btn');
    const genResetBtn = document.getElementById('generator-reset-btn');

    lengthSlider.addEventListener('input', (e) => {
        lengthValDisplay.textContent = e.target.value;
    });

    genResetBtn.addEventListener('click', () => {
        lengthSlider.value = 12;
        lengthValDisplay.textContent = 12;
        optUpper.checked = true;
        optLower.checked = true;
        optNumbers.checked = true;
        optSpecials.checked = true;
        
        genDisplay.textContent = "Click Generate Button";
        genDisplay.classList.add('placeholder');
        
        ratingBadge.textContent = "UNCONFIGURED";
        ratingBadge.style.background = 'rgba(255, 0, 85, 0.15)';
        ratingBadge.style.color = 'var(--neon-red)';
        ratingBadge.style.borderColor = 'rgba(255, 0, 85, 0.3)';
        showToast("Generator settings reset.", "info");
    });

    generateBtn.addEventListener('click', () => {
        const length = parseInt(lengthSlider.value);
        const includeUpper = optUpper.checked;
        const includeLower = optLower.checked;
        const includeNumbers = optNumbers.checked;
        const includeSpecials = optSpecials.checked;

        if (!includeUpper && !includeLower && !includeNumbers && !includeSpecials) {
            showToast("Error: Select at least one character type!", "info");
            return;
        }

        const generatedPass = generateSecurePassword(length, includeUpper, includeLower, includeNumbers, includeSpecials);
        genDisplay.textContent = generatedPass;
        genDisplay.classList.remove('placeholder');
        
        updateGeneratorRating(generatedPass);
        showToast("Secure password generated successfully.", "success");
    });

    function generateSecurePassword(length, upper, lower, num, spec) {
        const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowerSet = "abcdefghijklmnopqrstuvwxyz";
        const numSet = "0123456789";
        const specSet = "!@#$%^&*()_+-=[]{}|;:,.<>?";

        let characterPool = "";
        const guaranteedCharacters = [];

        if (upper) {
            characterPool += upperSet;
            guaranteedCharacters.push(getRandomCharacter(upperSet));
        }
        if (lower) {
            characterPool += lowerSet;
            guaranteedCharacters.push(getRandomCharacter(lowerSet));
        }
        if (num) {
            characterPool += numSet;
            guaranteedCharacters.push(getRandomCharacter(numSet));
        }
        if (spec) {
            characterPool += specSet;
            guaranteedCharacters.push(getRandomCharacter(specSet));
        }

        const remainingLength = length - guaranteedCharacters.length;
        const randomCharacters = [];
        const randomArray = new Uint32Array(remainingLength);
        window.crypto.getRandomValues(randomArray);

        for (let i = 0; i < remainingLength; i++) {
            const randomIndex = randomArray[i] % characterPool.length;
            randomCharacters.push(characterPool.charAt(randomIndex));
        }

        const mergedArray = guaranteedCharacters.concat(randomCharacters);
        const shuffledArray = secureShuffle(mergedArray);

        return shuffledArray.join('');
    }

    function getRandomCharacter(charset) {
        const randomInt = new Uint32Array(1);
        window.crypto.getRandomValues(randomInt);
        return charset.charAt(randomInt[0] % charset.length);
    }

    function secureShuffle(array) {
        const randomValues = new Uint32Array(array.length);
        window.crypto.getRandomValues(randomValues);
        
        for (let i = array.length - 1; i > 0; i--) {
            const j = randomValues[i] % (i + 1);
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    function updateGeneratorRating(password) {
        let ratingScore = 0;
        const len = password.length;
        
        if (len >= 14) ratingScore += 40;
        else if (len >= 12) ratingScore += 30;
        else if (len >= 10) ratingScore += 20;
        else ratingScore += 10;

        const characterClasses = [
            /[A-Z]/.test(password),
            /[a-z]/.test(password),
            /[0-9]/.test(password),
            /[^A-Za-z0-9]/.test(password)
        ].filter(Boolean).length;

        ratingScore += (characterClasses * 15);

        if (ratingScore < 50) {
            ratingBadge.textContent = "Weak";
            ratingBadge.style.background = 'rgba(255, 0, 85, 0.15)';
            ratingBadge.style.color = 'var(--neon-red)';
            ratingBadge.style.borderColor = 'rgba(255, 0, 85, 0.3)';
        } else if (ratingScore >= 50 && ratingScore < 80) {
            ratingBadge.textContent = "Medium";
            ratingBadge.style.background = 'rgba(255, 159, 0, 0.15)';
            ratingBadge.style.color = 'var(--neon-orange)';
            ratingBadge.style.borderColor = 'rgba(255, 159, 0, 0.3)';
        } else {
            ratingBadge.textContent = "Strong";
            ratingBadge.style.background = 'rgba(57, 255, 20, 0.1)';
            ratingBadge.style.color = 'var(--neon-green)';
            ratingBadge.style.borderColor = 'rgba(57, 255, 20, 0.3)';
        }
    }

    /* ==========================================
       CLIPBOARD UTILITY (COPY FUNCTIONS)
       ========================================== */
    copyGenBtn.addEventListener('click', () => {
        if (genDisplay.classList.contains('placeholder')) {
            showToast("Generate a password first before copying!", "info");
            return;
        }
        copyToClipboard(genDisplay.textContent);
    });

    const miniCopyBtns = document.querySelectorAll('.copy-mini-btn');
    miniCopyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                copyToClipboard(targetElement.textContent);
            }
        });
    });

    function copyToClipboard(text) {
        if (!navigator.clipboard) {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                // Exact Success Message matching user requirement
                showToast("Password copied successfully!", "success");
            } catch (err) {
                showToast("Unable to copy password.", "info");
            }
            document.body.removeChild(textArea);
            return;
        }

        navigator.clipboard.writeText(text).then(() => {
            // Exact Success Message matching user requirement
            showToast("Password copied successfully!", "success");
        }).catch(() => {
            showToast("Unable to copy password.", "info");
        });
    }

});
