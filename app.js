const form= document.getElementById('arama-formu');
const input = document.getElementById('sehir-input');
const mesaj = document.getElementById('mesaj');
const hizliSehir = document.getElementById('hizli-sehirler');
const sonSehirler = document.getElementById('son-sehirler');

let sonArananSehirler = [];

form.addEventListener("reset",function(){
    const aktifButon=hizliSehir.querySelector(".active");
    if(aktifButon){
        aktifButon.classList.remove("active");
    }
    mesaj.textContent = "Şehir adı temizlendi. Lütfen yeni bir şehir adı girin.";
    input.focus();
});

form.addEventListener("submit", function(event){
    event.preventDefault();
    //JavaScript'te bir olay (event) gerçekleştiğinde tarayıcının 
    //o olay için hazırladığı varsayılan (default) eylemi iptal etmek 
    //için kullanılan bir yöntemdir
    const sehir = input.value.trim();
    //trim kelimenin başında ve sonundaki boşlukları siler
    if(!sehir){
        mesaj.textContent = "Lütfen bir şehir adı girin.";
        return;
    }

    sonSehirEkle(sehir);
    sehirleriGoster();

    mesaj.textContent = sehir+ " için hava durumu bilgisi henüz yok. API entegrasyonu yapılacak.";
});

hizliSehir.addEventListener("click",function(event){
    if(event.target.tagName === "BUTTON"){
        const oncekiAktifButon=hizliSehir.querySelector(".active");
        if(oncekiAktifButon){
            oncekiAktifButon.classList.remove("active");
        }
        event.target.classList.add("active");

        const sehir=event.target.textContent.trim();

        input.value=sehir;
        form.requestSubmit();
    }


});

sonSehirler.addEventListener("click",function(event){
    if(event.target.tagName !== "BUTTON"){
        return;
    }
    input.value = event.target.textContent.trim();
    form.requestSubmit();
});

function sonSehirEkle(sehir){
    sonArananSehirler = sonArananSehirler.filter(function(kayit) {
        return kayit.toLocaleLowerCase("tr") !== sehir.toLocaleLowerCase("tr");
    });

    sonArananSehirler.unshift(sehir);
    if(sonArananSehirler.length > 10){
        sonArananSehirler.pop();
    }
}

function sehirleriGoster(){
    sonSehirler.innerHTML="";

    sonArananSehirler.forEach(function(sehir){
        const li= document.createElement("li");
        const buton=document.createElement("button");

        buton.type="button";
        buton.textContent=sehir;

        li.appendChild(buton);
        sonSehirler.appendChild(li);
    
    });
}

