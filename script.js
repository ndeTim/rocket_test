    const popup = document.getElementById('popup');
    const popupClose = document.querySelector('.popup-close');
    var leaveARequest = document.querySelectorAll(".leaveARequest");
    var lastLeaveARequest = document.querySelectorAll(".lastLeaveARequest");

    for (var i = 0; i < leaveARequest.length; i++) {
        leaveARequest[i].onclick = function(){
            popup.style.display = 'flex';
        };
    }
    for (var i = 0; i < lastLeaveARequest.length; i++) {
        lastLeaveARequest[i].onclick = function(){
            popup.style.display = 'flex';
        };
    }

    function hidePopup() {
        popup.style.display = 'none';
    }

    document.getElementById('closeBtn').addEventListener('click', function() {
        document.getElementById('popup').style.display = 'none';
    });


    var likeElements = document.querySelectorAll(".like");
    var messageContainer = document.getElementById("message-container");
    
    likeElements.forEach(function (like) {
        like.addEventListener("click", function () {
            if (this.classList.contains("active")) {
                this.classList.remove("active");
                this.classList.add("like");
                showMessage("Удалено из избранного", "removeLiked");
            } else if (this.classList.contains("like")) {
                this.classList.remove("like");
                this.classList.add("active");
                showMessage("Добавлено в избранное", "liked");
            }
        });
    });
    
    function showMessage(text, type) {
        if (!messageContainer.classList.contains("visible")) {
            messageContainer.classList.add("visible");
        }
    
        var message = document.createElement("div");
        message.className = `message ${type}`;
        message.textContent = text;
    
        messageContainer.appendChild(message);
    
        setTimeout(function () {
            message.classList.add("visible");
        }, 10);
    
        setTimeout(function () {
            message.classList.remove("visible");
            setTimeout(function () {
                message.remove();
    
                if (messageContainer.childElementCount === 0) {
                    messageContainer.classList.remove("visible");
                }
            }, 300);
        }, 2000);
    }
    


    const playButtons = document.querySelectorAll('.customPlayButton');

    playButtons.forEach(button => {
        const videoBlock = button.closest('.videoBlock');

        button.addEventListener('mouseenter', () => {
            videoBlock.classList.add('dimmed');
        });

        button.addEventListener('mouseleave', () => {
            videoBlock.classList.remove('dimmed');
        });
    });




    const slider = document.querySelector('.slider');
    const sliderItems = document.querySelectorAll('.slider .sliderItemCardBlock');
    const dotsContainer = document.querySelector('.dots-container');
    
    let currentIndex = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    function createDots() {
        dotsContainer.innerHTML = '';
        sliderItems.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active-dot');
            dotsContainer.appendChild(dot);
        });
    }
    
    function updateDots(index) {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active-dot', i === index);
        });
    }
    
    function updateSlider(index) {
        sliderItems.forEach((item, i) => {
            item.classList.remove('activeSlider', 'dimmedSlider');
            if (i === index) {
                item.classList.add('activeSlider');
                item.style.transform = 'translateX(0) scale(1)';
            } else if (i < index) {
                item.classList.add('dimmedSlider');
                item.style.transform = 'translateX(-100%)';
            } else {
                item.classList.add('dimmedSlider');
                item.style.transform = 'translateX(100%)';
            }
        });
    
        updateDots(index);
    }
    
    function onDragStart(event) {
        isDragging = true;
        startX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
    }
    
    function onDragMove(event) {
        if (!isDragging) return;
        currentX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
        const deltaX = currentX - startX;
    
        sliderItems[currentIndex].style.transform = `translateX(${deltaX}px) scale(1)`;
        const nextIndex = (currentIndex + 1) % sliderItems.length;
        const prevIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
    
        if (deltaX > 0) {
            sliderItems[prevIndex].style.transform = `translateX(calc(-50% + ${deltaX}px)) scale(0.8)`;
        } else {
            sliderItems[nextIndex].style.transform = `translateX(calc(50% + ${deltaX}px)) scale(0.8)`;
        }
    }
    
    function onDragEnd() {
        if (!isDragging) return;
        isDragging = false;
    
        const deltaX = currentX - startX;
    
        if (deltaX > 50) {
            currentIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
        } else if (deltaX < -50) {
            currentIndex = (currentIndex + 1) % sliderItems.length;
        }
    
        updateSlider(currentIndex);
    }
    
    // Инициализация
    slider.addEventListener('mousedown', onDragStart);
    slider.addEventListener('mousemove', onDragMove);
    slider.addEventListener('mouseup', onDragEnd);
    slider.addEventListener('mouseleave', onDragEnd);
    
    slider.addEventListener('touchstart', onDragStart);
    slider.addEventListener('touchmove', onDragMove);
    slider.addEventListener('touchend', onDragEnd);
    
    createDots();
    updateSlider(currentIndex);
    

    const checkbox = document.getElementById('agreeCheckBox');
    const submitButton = document.getElementById('submitButton');
    const firstName = document.querySelector('.firstName');
    const phoneNumber = document.querySelector('.phoneNumber');
    const errorMessages = document.querySelectorAll('.error-message');


    document.getElementById('contactForm').addEventListener('submit', function(event) {
        const errorMessages = document.querySelectorAll('.error-message');

        let formIsValid = true;

        errorMessages.forEach(message => {
            message.style.display = 'none';
            console.log('Скрыли сообщения об ошибках');
        });
    
        if (firstName.value.trim() === '') {
            console.log('Имя не заполнено');
            firstName.classList.add('error');
            const errorMessage = firstName.nextElementSibling;
            errorMessage.textContent = 'Поле не заполнено';
            errorMessage.style.display = 'block';
            formIsValid = false;
        } else {
            console.log('Имя заполнено');
            firstName.classList.remove('error');
        }
    
        if (phoneNumber.value.trim() === '') {
            console.log('Номер телефона не заполнен');
            phoneNumber.classList.add('error');
            const errorMessage = phoneNumber.nextElementSibling;
            errorMessage.textContent = 'Поле не заполнено';
            errorMessage.style.display = 'block';
            formIsValid = false;
        } else {
            console.log('Номер телефона заполнен');
            phoneNumber.classList.remove('error');
        }

        if (!formIsValid) {
            console.log('Форма невалидна, отправка отменена');
            event.preventDefault();
        } else {
            console.log('Форма валидна, можно отправить');
        }
    });
    
    function updateSubmitButtonState() {
        const isCheckboxChecked = checkbox.checked;
        const isFirstNameFilled = firstName.value.trim() !== '';
        const isPhoneNumberFilled = phoneNumber.value.trim() !== '';
    
        if (isCheckboxChecked && isFirstNameFilled && isPhoneNumberFilled) {
            submitButton.classList.remove('disabled');
            submitButton.removeAttribute('disabled');
        } else {
            submitButton.classList.add('disabled');
            submitButton.setAttribute('disabled', 'true');
        }
    }
    checkbox.addEventListener('change', updateSubmitButtonState);
    firstName.addEventListener('input', updateSubmitButtonState);
    phoneNumber.addEventListener('input', updateSubmitButtonState);