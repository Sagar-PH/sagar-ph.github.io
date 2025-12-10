document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
        user: this.name.value,
        email: this.email.value,
        message: this.message.value,
    };

    emailjs.send("service_wi7bgtp", "template_27wcqcn", formData)
        .then(() => {
            alert("Message sent successfully!");
            this.reset();
        })
        .catch((err) => {
            console.error("EmailJS Error:", err);
            alert("Failed to send message.");
        });
});

window.onload = function () {
    let letters = ['a', 'g', 'a', 'r', ' P', ' H']
    let tx_join_elem = document.getElementById('text_join')

    letters.forEach((letter, idx)=>{
        setTimeout(()=>{
            tx_join_elem.innerHTML = tx_join_elem.innerHTML + letter
        }, 300 * (idx+1))
    })

    const desig_elem = document.getElementsByClassName('p3')[0]
    const span_desig = desig_elem.getElementsByTagName('span')

    Array.from(span_desig).forEach((s_elem, idx)=>{
        setTimeout(()=>{
            s_elem.style.textShadow = '-0.25vw 0px rgb(199, 32, 82)'
        }, 50 * (idx+1))
    })
}

function set_neon_style(element) {
    const element_rect = element.getBoundingClientRect();

    if (element_rect.top >= 0) {
        visible_top = window.innerHeight - element_rect.top
        neon_height = visible_top * 0.25
    } else {
        neon_height = -(element_rect.top) + (window.innerHeight * 0.25)
    }

    if (neon_height <= element_rect.height) {
        return neon_height + "px";
    }

    return null
}

const progress_bar_arr = [
    ['education', 'ed_progress_bar'],
    ['work_experience', 'we_progress_bar'],
    ['project_one', 'po_progress_bar'],
    ['project_two', 'pt_progress_bar'],
    ['aboutmyself', 'am_progress_bar']
]

document.addEventListener("scroll", function () {

    const style_bars = document.getElementsByClassName("work_style");
    const rev_style_bars = document.getElementsByClassName("rev_work_style");

    Array.from(style_bars).forEach((element) => {
        const neon_element_o = element.getElementsByClassName('work_style_progress')[0];
        const height_o = set_neon_style(element)

        if (height_o !== null) {
            neon_element_o.style.height = height_o
        }
    });

    Array.from(rev_style_bars).forEach((element) => {
        const neon_element_t = element.getElementsByClassName('rev_work_style_progress')[0];
        const height_t = set_neon_style(element)

        if (height_t !== null) {
            neon_element_t.style.height = height_t
        }
    });


    progress_bar_arr.forEach((progress_elem) => {
        const education_element = document.getElementById(progress_elem[0]);
        const element_rect = education_element.getBoundingClientRect();
        const p_bar_elem = document.getElementsByClassName(progress_elem[1])[0];
        p_bar_elem.style.width = String(element_rect.width) + 'px'
        const height_th = set_neon_style(education_element)

        if (height_th !== null) {
            p_bar_elem.style.height = height_th
        }
    })
});

const links = document.getElementsByClassName('bar');
const sections = document.querySelectorAll('body section');

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        for (let j = 0; j < sections.length; j++) {
            if (sections[j] !== targetSection) {
                sections[j].classList.remove('auto');
            }
        }
        targetSection.classList.toggle('auto');
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
}

const ham_click = document.getElementById('hamburger')
ham_click.addEventListener('click', (event) => {
    const navbar = document.getElementsByClassName('navbar')[0]
    if (navbar.classList.contains('navshow')) {
        navbar.classList.remove('navshow')
    } else {
        navbar.classList.add('navshow')
    }
})

const menu_click = document.getElementsByClassName('navele')
Array.from(menu_click).forEach((element) => {
    element.addEventListener('click', () => {
        const navbar = document.getElementsByClassName('navbar')[0]
        navbar.classList.remove('navshow')
    })

})

