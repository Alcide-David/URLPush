// Création d'exceptions
class KeysNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = "KeysNotFound";
  }
}

class KeysAlreadyExist extends Error {
  constructor(message) {
    super(message);
    this.name = "KeysAlreadyExist";
  }
}

class SameKeysValueName extends Error {
  constructor(message) {
    super(message);
    this.name = "SameKeysValueName";
  }
}

class EmptyParameter extends Error {
  constructor(message) {
    super(message);
    this.name = "EmptyParameter";
  }
}

class BlankSpaceFound extends Error {
  constructor(message) {
    super(message);
    this.name = "BlankSpaceFound";
  }
}

class KeyError extends Error {
  constructor(message) {
    super(message);
    this.name = "KeyError";
  }
}

class URL_Projet {
  constructor() {}

  // Fonction pour l'ajout des paramètres
  Push(url, cle, valeur) {

    // On verifie si cle est un chiffre
    if (!isNaN(Number(cle))) {
      throw new KeyError("La clé ne peut pas être que des chiffres.");
    }

    //Verication s'il y a des espaces blancs dans les insertions
    if(cle.includes(" ")){
      throw new BlankSpaceFound("La cle ne peut pas contenir d'espaces blanc");
    }else if(valeur.includes(" ")){
      throw new BlankSpaceFound("La valeur ne peut pas contenir d'espaces blanc");
    }else if (url.includes(" ")){
      throw new BlankSpaceFound("L'URL'ne peut pas contenir d'espaces blanc");
    }

    

    //Verification si l'url cle ou la valeur inserer est vide
    if(url.length === 0){
      throw new EmptyParameter("L'URL ne peut etre vide.");
    }

    //Verification si la cle ou la valeur inserer est vide
    if (!cle && !valeur) {
      throw new EmptyParameter("La clé et la valeur ne peuvent pas être vides.");
    } else if (!valeur) {
      throw new EmptyParameter("La valeur ne peut pas être vide.");
    } else if (!cle) {
      throw new EmptyParameter("La clé ne peut pas être vide.");
    }

    //Verification si la cle et la valeur sont les memes
    if(cle === valeur){
      throw new SameKeysValueName("La clé et la valeur ne peuvent pas être même.");
    }

    //Verification si la cle existe
    if (this.Existe_Cle(url,cle)){
      throw new KeysAlreadyExist("La clé insérer existe déja.")
    }

    let separateur;
    if (url.includes("?")) {
      separateur = "&";
    } else {
      separateur = "?";
    }

    //Ajout des parametres(cle et valeur) dans l'url
    let Nouveau_Url = `${url}${separateur}${cle}=${valeur}`;
    return Nouveau_Url;
  }

  Update(url, cle, nouvelle_valeur) {

    //Verification si les parametres contiennent des espaces blancs
    if(cle.includes(" ")){
      throw new BlankSpaceFound("La cle ne peut pas contenir d'espaces blanc");
    }else if(nouvelle_valeur.includes(" ")){
      throw new BlankSpaceFound("La valeur ne peut pas contenir d'espaces blanc");
    }else if (url.includes(" ")){
      throw new BlankSpaceFound("L'URL'ne peut pas contenir d'espaces blanc");
    }

    //Verification si la cle et la nouvelle valeur sont vide
    if (!cle && !nouvelle_valeur) {
      throw new EmptyParameter("La clé et la nouvelle valeur ne peuvent pas être vides.");
    } else if (!nouvelle_valeur) {
      throw new EmptyParameter("La nouvelle valeur ne peut pas être vide.");
    } else if (!cle) {
      throw new EmptyParameter("La nouvelle clé ne peut pas être vide.");
    }

    //Verification si la cle et la nouvelle_valeur sont egales
    if(cle === nouvelle_valeur){
      throw new SameKeysValueName("La clé et la valeur ne peuvent pas être même.");
    }

    //Verification si la cle existe
    if (!this.Existe_Cle(url,cle)){
      throw new KeysNotFound("La clé insérer n'existe pas.")
    }

    //Creation d'une instance de la classe URL_Projet()
    let test = new URL_Projet();
  
    //On optient l'ensemble des cle de l'URL a partir de la methode Get
    const parametres = test.Get(url);
    //On verifie si la cle inserer se trouve dans l'URL
    if (cle in parametres) {
      parametres[cle] = nouvelle_valeur;
      return test.buildUrl(url, parametres);
    } else {
      throw new KeysNotFound(`La clé "${cle}" n'existe pas dans l'URL.`);
    }
  }

  // Ajouter une méthode pour supprimer un paramètre de l'URL
  Remove(url, cle) {

    if (!cle) {
      throw new EmptyParameter("Veuillez spécifier une clé pour la suppression.");
    }


    if (!this.Existe_Cle(url,cle)){
      throw new KeysNotFound("La clé insérer n'existe pas.")
    }

    if(cle.includes(" ")){
      throw new BlankSpaceFound("La cle ne peut pas contenir d'espaces blanc");
    }else if (url.includes(" ")){
      throw new BlankSpaceFound("L'URL'ne peut pas contenir d'espaces blanc");
    }

    let parametres = this.Get(url);
    if (cle in parametres) {
      delete parametres[cle];
      //On reconstruit l'URL
      return this.buildUrl(url, parametres);
    } else {
      throw new KeysNotFound(`La clé "${cle}" n'existe pas dans l'URL.`);
    }
  }

  //Fonction qui renvoie l'ensembre des parametres de l'URL (cle et leur valeur)
  Get(url) {
    
    //On verifie si l'URL contien des espaces
    if (url.includes(" ")){
      throw new BlankSpaceFound("L'URL'ne peut pas contenir d'espaces blanc");
    }

    let parametres = {};
    if (url.includes("?")) {
      let partie_parametre = url.split("?")[1];
      let parametre_pairs = partie_parametre.split("&");
      for (let i = 0; i < parametre_pairs.length; i++) {
        let case_tableau = parametre_pairs[i];
        let [cle, valeur] = case_tableau.split("=");
        parametres[cle] = valeur;
      }
    }
    return parametres;
  }

  //Fonction qui permet de verifier si la cle inserer par l'Utilisateur existe deja
  Existe_Cle(url,new_cle){
    
    let parametres = {};
    let get_cle;
    
    //On verifie si ? est present pour savoir si l'URL contien des cles
    if (url.includes("?")) {
      //Partie parrametre contient toute la partie de l'URL apres le point d'interrogation
      let partie_parametre = url.split("?")[1];
      //On divise parametres_pairs en tableau, dans chaque case on a kle=valeur
      let parametre_pairs = partie_parametre.split("&");

      //Boucle qui nous permet de parcourir le tableau et de recuperer chaque cle distinctes et leur valeurs
      for (let i = 0; i < parametre_pairs.length; i++) {
        let case_tableau = parametre_pairs[i];
        let [cle, valeur] = case_tableau.split("=");
        parametres[cle] = valeur;
        get_cle = cle;
      }
    }

    //Si la cle inserer existe deja dans l'Url on la retourne sinon on retourne false
    if(new_cle === get_cle){
      return get_cle;
    }else{
      return false;
    }
  }

  // Fonction qui permet de recréer l'URL après chaque modification
  buildUrl(url, params) {

  // baseUrl contient toute la partie de l'URL située avant le point d'interrogation
  let baseUrl = url.split("?")[0];
  
  // Initialisation d'une chaîne vide pour stocker les paramètres de l'URL
  let paramString = '';

  // Parcours de tous les paires clé-valeur dans l'objet params
  for (let [cle, valeur] of Object.entries(params)) { //l'objet params contient tout les pairs cle=valeur
    // On construit la chaine en ajoutant apres chaque cle=valeur "&"
    paramString += `${cle}=${valeur}&`;
  }

  // Vérification si la chaîne de paramètres n'est pas vide
  if (paramString.length > 0) {
    // On efface le dernier "&" 
    paramString = paramString.slice(0, -1);
  }

  // Vérification si des paramètres existent, puis construction de la nouvelle URL
  if (paramString) {
    return `${baseUrl}?${paramString}`;
  } else {
    // Sinon on retourne l'URL inchangée
    return baseUrl;
  }    
}

  
}


//Ensemble de fonction qui recupere les id dans la page formulaire contenant les donnees inserer par l'utilisateur
function ajouterParametre() {
  //Recuperation des valeurs dans la page html
  let urlInput = document.getElementById('urlInput');
  let nouvelleCleInput = document.getElementById('nouvelleCle');
  let nouvelleValeurInput = document.getElementById('nouvelleValeur');
  let errorMessageDiv = document.getElementById('errorMessage');

  try {
    //Instanciation de la classe URL_Projet()
    let url = new URL_Projet();
    urlInput.value = url.Push(urlInput.value, nouvelleCleInput.value, nouvelleValeurInput.value);
    errorMessageDiv.textContent = ''; // Efface les messages d'erreur précédents
    resetChamps(); // Réinitialise les champs
  } catch (error) {
    Afficher_Erreur(error, errorMessageDiv);
  }
}

//Fonction pour modifier une cle
function modifierParametre() {
  //Recuperation des valeurs dans la page html
  let urlInput = document.getElementById('urlInput');
  let cleExistanteInserer = document.getElementById('cleExistante');
  let nouvelleValeur= document.getElementById('nouvelleValeurExistante');
  let errorMessageDiv = document.getElementById('errorMessage');

  try {
    //Instanciation de la classe URL_Projet()
    let url = new URL_Projet();
    urlInput.value = url.Update(urlInput.value, cleExistanteInserer.value, nouvelleValeur.value);
    errorMessageDiv.textContent = ''; // Efface les messages d'erreur précédents
    resetChamps(); // Réinitialise les champs
  } catch (error) {
    Afficher_Erreur(error, errorMessageDiv);
  }
}


//Fonction pour rechercher une cle
function RechercherCle() {
  //Recuperation des valeurs dans la page html
  let urlInput = document.getElementById('urlInput');
  let cleARechercher = document.getElementById('cleARechercher');
  let errorMessageDiv = document.getElementById('errorMessage');
  let resultatRechercheDiv = document.getElementById('resultatRechercheDiv');

  try {
    //Instanciation de la classe URL_Projet()
    let url = new URL_Projet();
    //On recupere l'ensemple des cles grace a la fonction Get
    let parametres = url.Get(urlInput.value);

    // Vérifier si la clé à rechercher existe dans les paramètres
    let cleRecherche = cleARechercher.value.trim();
    if (cleRecherche === '') {
      throw new EmptyParameter("Veuillez spécifier une clé pour la recherche.");
    }

    if (cleRecherche in parametres) {
      // Afficher le résultat de la recherche avec la valeur de la clé
      resultatRechercheDiv.textContent = `Nom cle : [ "${cleRecherche}" ] \n || Valeur - "${parametres[cleRecherche]}".`;
      setTimeout(() => { resultatRechercheDiv.textContent = ''; }, 10000);
    } else {
      resultatRechercheDiv.textContent = `La clé "${cleRecherche}" n'existe pas dans l'URL.`;
      setTimeout(() => { resultatRechercheDiv.textContent = ''; }, 10000);
    }

    // Effacer les messages d'erreur précédents
    errorMessageDiv.textContent = '';
    resetChamps(); // Réinitialise les champs
  } catch (error) {
    Afficher_Erreur(error, errorMessageDiv);
  }
}  

//Fomction pour supprimer une cle
function supprimerParametre() {
  //Recuperation des valeurs dans la page html
  let urlInput = document.getElementById('urlInput');
  let cleASupprimerInput = document.getElementById('cleASupprimer');
  let errorMessageDiv = document.getElementById('errorMessage');

  try {
    //Instanciation de la classe URL_Projet()
    let url = new URL_Projet();
    urlInput.value = url.Remove(urlInput.value, cleASupprimerInput.value);
    errorMessageDiv.textContent = ''; // Efface les messages d'erreur précédents
    resetChamps(); // Réinitialise les champs
  } catch (error) {
    Afficher_Erreur(error, errorMessageDiv);
  }
}


function Afficher_Erreur(error, errorMessageDiv) {
  //Chaque erreur revoiera le message personaliser qui depend de la condition
  switch (error.name) {
    case 'KeysNotFound':
      resetChamps();
      errorMessageDiv.textContent = error.message;
      setTimeout(() => { errorMessageDiv.textContent = ''; }, 2000);
      break;
    case 'KeysAlreadyExist':
      resetChamps()
      errorMessageDiv.textContent = error.message;
      setTimeout(() => { errorMessageDiv.textContent = ''; }, 2000);
      break;
    case 'SameKeysValueName': 
      resetChamps()
      errorMessageDiv.textContent = error.message;
      setTimeout(() => { errorMessageDiv.textContent = ''; }, 2000);
      break;
    case 'EmptyParameter': 
      resetChamps()
      errorMessageDiv.textContent = error.message; // Pour utiliser le message de l'erreur
      setTimeout(() => { errorMessageDiv.textContent = ''; }, 2000);
      break;
    case 'BlankSpaceFound': 
      resetChamps()
      errorMessageDiv.textContent = error.message; // Utiliser le message de l'erreur
      setTimeout(() => { errorMessageDiv.textContent = ''; }, 2000);
      break; 
    case 'KeyError': 
      resetChamps()
      errorMessageDiv.textContent = error.message; // Utiliser le message de l'erreur
      setTimeout(() => { errorMessageDiv.textContent = ''; }, 2000);
      break; 
    default:
      // Si ce n'est pas une erreur personnalisée, afficher un message générique
      if (error.name !== "Error") {
      resetChamps()
        errorMessageDiv.textContent = error.message;
        setTimeout(() => { errorMessageDiv.textContent = ''; }, 2000);
      }
  }
}

//Fonction pour effacer les champs apres qu'on ai cliquer sur le bouton
function resetChamps() {
  document.getElementById('nouvelleCle').value = '';
  document.getElementById('nouvelleValeur').value = '';
  document.getElementById('cleExistante').value = '';
  document.getElementById('nouvelleValeurExistante').value = '';
  document.getElementById('cleASupprimer').value = '';
  document.getElementById('cleARechercher').value = '';
}

