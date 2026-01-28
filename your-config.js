// use same amount of smtp and message
exports.smtp = [
  { host: "smtp.ionos.de", port: "587", auth: true, user: "account1@domain.com", pass: "pass1" },
  { host: "smtp.gmail.com", port: "587", auth: true, user: "account2@domain.com", pass: "pass2" }
];

exports.message = [
  { fromName: "Support", fromEmail: "account1@domain.com", subject: "Alert 1" },
  { fromName: "Service", fromEmail: "account2@domain.com", subject: "Alert 2" }
];

// multy shortlink
exports.shortlink = [
	'https://rd.bizrate.com/rd?t=http%3A%2F%2Fwww.thepovnews.com/redirectinfo.php',
]

exports.send = {
	delay			: 3, // delay between emails in seconds
	pauseAfter		: 1, // pause after how many emails
	pauseFor		: 3, // pause rfor how many seconds
	useAmazonSES	: false, // comming soon
	useHeader		: false, // If you want to use custom header set to true
	useAttach		: true, // If you will be sending with attachement set to true
	useHttpProxy	: false, // If you want to use http proxy set to true
	text			: "test from stacy", // this is the content text that will show before the template message
	letter: ["letter1.html", "letter2.html", "letter3.html"],
	list 			: "your-list.txt", // file list lo
};

exports.proxy = {
	http 	: "87.228.103.111:8080", // jangan di pake belom fix 
};

// attachments: prefer `files` (array). `file` (single) is still supported for backward compatibility.
exports.attach = {
	files: [ "CASE-9421492353.pdf", "CASE-875262722.pdf" ] // array of file paths
};

exports.custom_headers = {
	KONTOL 	: "KONTOL" // bisa diisi sesuka hati tapi gabisa pakai random tag ya
};