"use strict";
const nodemailer = require("nodemailer");
const moment = require("moment");
const colors = require("colors");
const fs = require("fs");
const random = require("./random.js");
const config = require("./your-config.js");
const figlet = require("figlet");

var staticDate = moment().format("YYYYMMDDHHMMSS");

// print logo yoursender
console.log(
	colors.rainbow(
		figlet.textSync(" CTW Mailer", {
			font: "Ogre",
			horizontalLayout: "default",
			verticalLayout: "default"
		})
	)
);

console.log(
	"                              " + colors.italic("Version: v10.0")
);
console.log(
	"                              " + colors.italic("For: CTW")
);
console.log(
	"                              " + colors.italic("@astute_support")
);
console.log("");
// -------------------------------------

const list = fs
	.readFileSync(config.send.list)
	.toString()
	.split("\n");
console.log(
	colors.white(" [+]")+
	colors.blue(
		" is importing your mailing list from " +
		colors.cyan(" " + config.send.list + " ")
	)
);

// Load letters - support both single string and array of strings
const letterFiles = Array.isArray(config.send.letter) ? config.send.letter : [config.send.letter];
const letters = letterFiles.map(file => fs.readFileSync(file, "utf-8"));

console.log(
	colors.white(" [+]")+
	colors.blue(
		" taking html from " +
		colors.cyan(" " + (Array.isArray(config.send.letter) ? config.send.letter.join(", ") : config.send.letter) + " ")
	)
);

// show attachments if enabled
if (config.send.useAttach) {
	var attachList = [];
	if (Array.isArray(config.attach && config.attach.files)) {
		attachList = config.attach.files.slice();
	} else if (config.attach && config.attach.file) {
		attachList = [config.attach.file];
	}
	console.log(
		colors.white(" [+]")+
		colors.blue(
			" attachments: " +
			colors.cyan(" " + (attachList.length ? attachList.join(", ") : "(no files set)") + " ")
		)
	);
}

console.log(
	colors.white(" [+]")+
	colors.blue(" starting the sender engine ... ... ... ")
);

function getDate() {
	return moment().format("MMM D, hh:mm:ss a");
}

// ganti string
function replace_tags(input, email) {
	return input
		.replace(new RegExp("{email}", "g"), email)
		.replace(new RegExp("{date}", "g"), getDate())
		.replace(new RegExp("{random_ip}", "g"), random.ip())
		.replace(new RegExp("{random_country}", "g"), random.country())
		.replace(new RegExp("{random_device}", "g"), random.device())
		.replace(new RegExp("{random_browser}", "g"), random.browser())
		.replace(new RegExp("{random_subject}", "g"), random.subject())
		.replace(new RegExp("{random_fnamazon}", "g"), random.fnamazon())
		.replace(new RegExp("{random_fnpaypal}", "g"), random.fnpaypal())
		.replace(new RegExp("{random_statement}", "g"), random.statement())
		.replace(new RegExp("{random_shortlink}", "g"), randomArray(config.shortlink))
		.replace(new RegExp(/\{random_number_(\d+)\}/, "g"), (_, n) => random.number(n))
		.replace(new RegExp(/\{random_letterup_(\d+)\}/, "g"), (_, n) => random.letterup(n))
		.replace(new RegExp(/\{random_letterlow_(\d+)\}/, "g"), (_, n) => random.letteruplow(n))
		.replace(new RegExp(/\{random_letteruplow_(\d+)\}/, "g"), (_, n) => random.letteruplow(n))
		.replace(new RegExp(/\{random_letternumberuplow_(\d+)\}/, "g"), (_, n) => random.letternumberuplow(n));
}

// random array
function randomArray(array){
  var id = Math.floor(Math.random() * array.length);
  return array[id];
}

	// mengganti objek berisi string
function get_customised_message_template(email, smtpIndex) {
	// Use the message at the same index as the SMTP, or fallback to cycling through messages
	var messageIndex = smtpIndex % config.message.length;
	var selectedMessage = config.message[messageIndex];
	var randomHtml = randomArray(letters);
	return {
		subject: replace_tags(selectedMessage.subject, email),
		fromName: replace_tags(selectedMessage.fromName, email),
		fromEmail: replace_tags(selectedMessage.fromEmail, email),
		text: replace_tags(config.send.text, email),
		html: replace_tags(randomHtml, email)
	};
}function kirim (email,cnt) {

	// --------------- multy smtp --------------
	// Select SMTP by cycling through array
	var smtpIndex = cnt % config.smtp.length;
	var randomArraySmtp = config.smtp[smtpIndex];

	var smtp = {
		host: randomArraySmtp.host,
		port: randomArraySmtp.port,
		secure: false
	};

	if (randomArraySmtp.auth) {
		smtp["auth"] = {
			user: randomArraySmtp.user,
			pass: randomArraySmtp.pass
		};
	}

	if (config.send.useHttpProxy) {
		smtp["proxy"] = "http://" + config.proxy.http;
	}

	// amazon ses
	if (config.send.useAmazonSES) {
		aws.config.loadFromPath('configAmazonSES.json');
		const transporter = nodemailer.createTransport({
		    SES: new aws.SES({
		        apiVersion: '2010-12-01'
		    })
		});
	}

	const transporter = nodemailer.createTransport(smtp);

	// -------------------------------------------

	const random_message = get_customised_message_template(email, smtpIndex);

	const message = {
		from: random_message.fromName + "<" + random_message.fromEmail + ">",
		to: email,
		subject: random_message.subject,
		text: random_message.text,
		html: random_message.html
	};

	if (config.send.useHeader) {
		message.headers = { ...config.custom_headers
		};
	}

	if (config.send.useAttach) {
		// support multiple attachments via `config.attach.files` (array)
		if (Array.isArray(config.attach.files)) {
			message.attachments = config.attach.files.map(function(p){ return { path: p }; });
		} else if (config.attach.file) {
			message.attachments = [ { path: config.attach.file } ];
		} else {
			message.attachments = [];
		}
	}

	transporter.sendMail(message, (error, info) => {

		if (error) {
			fs.appendFileSync("your-logs/your-failed-"+staticDate+".txt", "failed => "+email);
			return console.log(error);

		}
		if (config.send.useHttpProxy) {
			console.log(
				colors.white(" [+]")+
				colors.cyan(" [" +(cnt+1)+ "/" + list.length + "]") +
				colors.yellow(" [" + getDate() + "]") +
				colors.green(" [@sTacypr0247]") +
				colors.white(" [" + randomArraySmtp.user + "]") +
				colors.red(" [http Proxy: " + config.proxy.http + "]") +
				colors.magenta(" [sent to :" + email.replace(/(\r\n|\n|\r)/gm,"") + "]") +
				colors.red(" Delay for " + config.send.delay + " seconds... ")
			);
		} else {
			console.log(
				colors.white(" [+]")+
				colors.cyan(" [" +(cnt+1)+ "/" + list.length + "]") +
				colors.yellow(" [" + getDate() + "]") +
				colors.green(" [@sTacypr0247]") +
				colors.white(" [" + randomArraySmtp.user + "]") +
				colors.magenta(" [sent to :" + email.replace(/(\r\n|\n|\r)/gm,"") + "]") +
				colors.red(" Delay for " + config.send.delay + " seconds... ")
			);
			if ((cnt+1) % config.send.pauseAfter === 0) {
				console.log(colors.red(" [+] Paused for "+config.send.pauseFor+" seconds after "+config.send.pauseAfter+" emails"));
			}
		}
	});
};

const timeout = ms => new Promise(res => setTimeout(res, ms))
async function startSend() {
	for (var i = 0; i < list.length; i++) {
		kirim(list[i],i);
		if ( (i%config.send.pauseAfter) == 4) {
			await timeout(config.send.pauseFor*1000);
		}else{
			await timeout(config.send.delay*1000);
		}
	}
}

startSend();
