const welcomeMail = password => {
  return {
    subject: "Bienvenue à 1000Coders",
    body: `Cher candidat bonjour,<br><br>

		N’hésitez pas à nous solliciter pour toute question sur le 1000coders@gomycode.tn
		L’équipe de GoMyCode vous remercie pour votre intérêt dans le programme 1000 Coders et vous souhaite bonne chance.<br><br>
		
		Pour la suite, vous ne serez contacté par email que si vous passez la première étape de sélection. Si vous ne recevez pas d’email dans les 15 jours suivant la soumission du test en ligne, vous pouvez considérer que votre candidature n’a pas été retenue.<br><br>
		
		Votre mot de passe : \\${password} <br><br>

		Au plaisir de vous retrouver parmi nous,<br><br>
		
		L’équipe GoMyCode
		`
  };
};

const firstStepSuccess = () => {
  return {
    subject: "1ère étape réussite",
    body: `Cher candidat,<br><br>
	
		L’équipe GoMyCode vous remercie d’avoir pris le temps d’effectuer la première étape de sélection du programme 1000 Coders.<br><br>
		
		Nous avons le plaisir de vous annoncer que vous avez bien réussi la première étape de sélection et que vous passez à la deuxième étape de sélection qui aura lieu dans notre espace le xxx.<br><br>
		
		Vous êtes donc invités à être présent dans notre espace le xx à xx<br><br>
		
		Prière de confirmer votre présence sur le lien suivant: xxx [bouton de confirmation]<br><br>
		
		Au plaisir de vous retrouver parmi nous.<br><br>
		
		L’équipe GoMyCode
		`
  };
};

const secondStepSuccessnd = () => {
  return {
    subject: "2ème étape réussite",
    body: `Cher candidat bonjour,<br><br>

		Bravo !<br><br>
		
		Vous avez été sélectionné pour participer dans le programme 1000 Coders.<br><br>
		
		Nous serons ravis de vous accueillir parmi nous pour démarrer la session de formation le xxx<br><br>
		
		Pour plus de détails sur le programme, nous vous invitons à visiter la page du programme sur notre site…<br><br>
		
		À très vite,<br><br>
		
		L’équipe GoMyCode
		
		`
  };
};

module.exports = { welcomeMail, firstStepSuccess, secondStepSuccessnd };
