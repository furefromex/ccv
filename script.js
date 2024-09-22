document.addEventListener('DOMContentLoaded', () => {
    const buyButton = document.getElementById('buyButton');
    const continueButton = document.getElementById('continueButton');
    const acceptTerms = document.getElementById('acceptTerms');
    const steps = document.querySelectorAll('.step');

    buyButton.addEventListener('click', () => {
        showStep(2);
        simulateLoading().then(() => {
            showStep(3);
        });
    });

    acceptTerms.addEventListener('change', () => {
        continueButton.disabled = !acceptTerms.checked;
    });

    continueButton.addEventListener('click', () => {
        showStep(4);
    });

    document.querySelectorAll('.select-plan').forEach(button => {
        button.addEventListener('click', (e) => {
            const plan = e.target.dataset.plan;
            confirmPurchase(plan);
        });
    });

    function showStep(stepNumber) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index + 1 === stepNumber);
        });
    }

    function simulateLoading() {
        return new Promise((resolve) => {
            const progress = document.querySelector('.progress');
            let width = 0;
            const interval = setInterval(() => {
                if (width >= 100) {
                    clearInterval(interval);
                    resolve();
                } else {
                    width += 10;
                    progress.style.width = width + '%';
                }
            }, 200);
        });
    }

    function confirmPurchase(plan) {
        fetch('process.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `action=confirm&plan=${plan}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                // Here you would typically redirect to a thank you page or initiate the app download
            } else {
                alert('Purchase failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    }
});