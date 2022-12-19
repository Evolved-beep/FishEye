const photographersId = new URL(location.href).searchParams.get("id");
const getData = async () =>
  await fetch("../../data/photographers.json").then((response) =>
    response.json()
  );

function nameForm(getPhoto) {
  const name = document.querySelector(".name");
  name.innerHTML = `${getPhoto.name}`;
}

function openModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

let form = document.querySelector("#form-action");
form.prenom.addEventListener("focusout", function () {
  validPrenom();
});
form.nom.addEventListener("focusout", function () {
  validNom();
});
form.email.addEventListener("focusout", function () {
  validMail();
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (validate() === true) {
    event.stopPropagation();
    alert("Votre formulaire vient d'être envoyé");
    return closeModal();
  } else {
    alert("Il y'a une erreur dans votre formulaire");
  }
});

let Msg = document.createElement("span");
function setError(element, message) {
  Msg.classList.remove("successMessage");
  Msg.classList.add("erreurMessage");
  Msg.innerHTML = message;
  element.classList.remove("inputValid");
  element.classList.add("inputErreur");
  element.parentElement.append(Msg);
  return false;
}

function setValid(element, message) {
  Msg.classList.remove("erreurMessage");
  Msg.classList.add("successMessage");
  Msg.innerHTML = message;
  element.classList.remove("inputErreur");
  element.classList.add("inputValid");
  element.parentElement.append(Msg);
  return true;
}

function validPrenom() {
  const prenomRegExp = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ- -]{2,}$");
  if (prenomRegExp.test(form.prenom.value.trim())) {
    console.log(form.prenom.value)
    return setValid(form.prenom, "Votre saisie est valide");
  }

  return setError(
    form.prenom,
    "Vous devez entrer deux caractères valide minimum !"
  );
}

function validNom() {
  const nomRegExp = new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ- -]{2,}$");
  if (nomRegExp.test(form.nom.value.trim())) {
    console.log(form.nom.value);
    return setValid(form.nom, "Votre saisie est valide")
  }

  return setError(form.nom, "Vous devez entrer deux caractères valide minimum");
}

function validMail() {
  const mailRegExp = new RegExp(
    "^[a-zA-Z0-9À-ÖØ-öø-ÿ. -_]{1,}[@]{1}[a-zA-Z0-9.-_]{1,}[.]{1}[a-zA-Z]{2,10}$"
  );
  if (mailRegExp.test(form.email.value.trim())) {
    console.log(form.email.value);
    return setValid(form.email, "Votre email est valide");
  }

  return setError(form.email, "Vous devez entrer une adresse mail valide");
}

const validate = function () {
  if (validPrenom() && validNom() && validMail()) {
    return true;
  }
};

const initId = async () => {
  const { photographers } = await getData();
  const getPhoto = photographers.find(
    (photographers) => photographers.id == photographersId
  );
  nameForm(getPhoto);
};

initId();
