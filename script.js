import { db } from "./firebase-config.js";

import {
collection,
getDocs,
doc,
updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const lista = document.getElementById("presentes");

async function carregarPresentes() {

    lista.innerHTML = "";

    const snapshot = await getDocs(collection(db, "presentes"));

    snapshot.forEach((item) => {

        const presente = item.data();

        const div = document.createElement("div");

        div.classList.add("card");

        div.innerHTML = `
    <img src="${presente.imagem}" alt="${presente.nome}" class="foto-presente">

    <h3>${presente.nome}</h3>

    <p class="${presente.reservado ? 'reservado' : 'disponivel'}">
        ${
            presente.reservado
            ? `Reservado por ${presente.reservadoPor}`
            : 'Disponível'
        }
    </p>

    ${
        !presente.reservado
        ? `<button data-id="${item.id}">
            Reservar
          </button>`
        : ''
    }
`;

        lista.appendChild(div);
    });

    adicionarEventos();
}

function adicionarEventos() {

    document.querySelectorAll("button")
    .forEach(btn => {

        btn.addEventListener("click", async () => {

            const nome = prompt("Digite seu nome:");

            if(!nome) return;

            const id = btn.dataset.id;

            await updateDoc(doc(db,"presentes",id),{
                reservado:true,
                reservadoPor:nome
            });

            carregarPresentes();
        });

    });
}

carregarPresentes();

const dataCasamento = new Date("2026-07-23 19:00:00");

function atualizarContador() {
    const agora = new Date();

    const diferenca = dataCasamento - agora;

    if (diferenca <= 0) {
        document.getElementById("tempo").innerHTML =
            "💍 Hoje é o grande dia!";
        return;
    }

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));

    const horas = Math.floor(
        (diferenca % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutos = Math.floor(
        (diferenca % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const segundos = Math.floor(
        (diferenca % (1000 * 60)) /
        1000
    );

    document.getElementById("tempo").innerHTML =
        `${dias} dias ${horas}h ${minutos}m ${segundos}s`;
}

setInterval(atualizarContador, 1000);
atualizarContador();

