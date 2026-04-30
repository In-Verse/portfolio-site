/* Hello World
* All the crazy ways you can say hello world
* Many come from the cmdchallenge
* You can use hex escape sequences! But it doesn't show well, its like echo $'hello world' so there must be preprocessing
* echo $'\x68\x65\x6c\x6c\x6f\x20\x77\x6f\x72\x6c\x64'
* Still contemplating if I should just have the 'echo hello world' */
const commands = [
	"echo \"dlrow olleh\" | rev",
	"cat <(echo \"hello world\")",
	"cat <<< \"hello world\"",
	"cat >/dev/stdout <<<\"hello world\"",
	"i='hello world'; echo $i",
	"awk 'BEGIN { print \"hello world\" }'",
	"echo \"$(echo hello)\" \"$(echo world)\"",
	"echo ifmmp xpsme |tr bcdefghijklmnopqrstuvwxyza abcdefghijklmnopqrstuvwxyz",
	"for i in h e l l o; do echo -n $i; done; echo -n \" \"; for j in w o r l d; do echo -n $j; done",
	"( for i in h e l l o ' '  w o r l d ; do echo \"$i\" | awk -F, ' {print $NR}'; done ) |tr -d '\\n'",
	"a=(d e h l o r w X \") ; s=(2 1 3 3 4 7 6 4 5 3 0) ; for i in ${s[@]} ; do echo -n ${a[$i]}|tr X\\n ' '; done ; echo \"\"",
	"x=hello; y=world; echo ${x} ${y}",
	"printf '%s' 'hello world'",
	"tee /dev/null <<< 'hello world'",
	"echo 'aGVsbG8gd29ybGQ=' | base64 -d",
	"echo 'NBSWY3DPEB3W64TMMQ======' | base32 -d",
	"yes 'hello world' | head -n 1",
	"echo 'h''e''l''l''o' 'w''o''r''l''d'",
	"date | sed 's/.*/hello world/'",
	"join <(echo '1 hello') <(echo '1 world') | cut -d ' ' -f2-3",
	"dd if=/dev/stdin <<< 'Hello World' conv=lcase 2>/dev/null",
	"head -n 1 <( curl -s www.computerpoetry.com/assets/js/hello-world.js ) | sed 's|/\* ||; s|.*|\L&|'"
];

/* Pick a random command */
const randomCommand = commands[Math.floor(Math.random() * commands.length)];

/* I know the preferred way to do is with async tho */
function typeText(element, text, speed = 40) {
	return new Promise((resolve) => {
		let i = 0;
		const interval = setInterval(() => {
			/* If the element is empty... fallback shouldn't happen */
			if (!element) {
				clearInterval(interval);
				resolve();
				return;
			}
			/* Looping through text and adding one character at a time */
			if (i <= text.length) {
				element.textContent = text.slice(0, i);
				i++;
				return;
			}
			clearInterval(interval);
			resolve();
		}, speed);
	});
}

if (typeof document !== 'undefined') {
	console.log(commands);
	/* Looking for the specific elements */
	const cmdEl = document.querySelector('.terminal .command');
	const outEl = document.querySelector('.terminal .output');
	if (cmdEl) {
		cmdEl.textContent = '';
		typeText(cmdEl, randomCommand, 35).then(() => {
			if (outEl) {
				setTimeout(() => {
					// Every command needs to output 'hello world' 
					outEl.textContent = '\nhello world\n\n';
					cmdEl.classList.add('done');
					const newPrompt = document.createElement('span');
					// We need to add a new prompt for the next command, otherwise it looks weird (not typical terminal emulator behavior)
					newPrompt.innerHTML = '<span class="prompt">[thyme@node ~]$</span> <span class="new-prompt"></span>';
					outEl.after(newPrompt);
				}, 800);
			}
		});
	}
}