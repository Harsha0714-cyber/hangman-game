#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#define MAX_WRONG 6
#define MAX_WORDS 15
#define MAX_LEN 20

char words[MAX_WORDS][MAX_LEN]={
"programming","hangman","computer","keyboard","terminal",
"function","variable","network","compiler","algorithm",
"pointer","database","software","hardware","debugger"
};

void clearScreen(){
#ifdef _WIN32
system("cls");
#else
system("clear");
#endif
}

void drawHangman(int w){
printf("\n  +---+\n");
printf("  |   |\n");
printf("  %c   |\n",w>=1?'O':' ');
printf(" %c%c%c  |\n",w>=3?'/':' ',w>=2?'|':' ',w>=4?'\\':' ');
printf(" %c %c  |\n",w>=5?'/':' ',w>=6?'\\':' ');
printf("      |\n");
printf("=========\n\n");
}

void pickWord(char *word){
    strcpy(word,words[rand()%MAX_WORDS]);
}

void initDisplay(char *d,int len){
 for(int i=0;i<len;i++) d[i]='_';
 d[len]='\0';
}

int checkGuess(char *word,char *disp,char ch){
 int found=0;
 for(int i=0;word[i];i++){
   if(word[i]==ch){disp[i]=ch;found=1;}
 }
 return found;
}

int checkWin(char *d){
 for(int i=0;d[i];i++) if(d[i]=='_') return 0;
 return 1;
}

int already(char *g,int c,char ch){
 for(int i=0;i<c;i++) if(g[i]==ch) return 1;
 return 0;
}

void showWord(char *d){
 printf("Current Word : ");
 for(int i=0;d[i];i++) printf("%c ",d[i]);
 printf("\n");
}

int main(){
 char word[MAX_LEN],disp[MAX_LEN],wrong[26];
 int wrongCount,wrongStored,won;
 char ch,choice;

 do{
 srand((unsigned)time(NULL));
 pickWord(word);
 initDisplay(disp,strlen(word));
 wrongCount=0;wrongStored=0;won=0;

 clearScreen();
 printf("==================================\n");
 printf("         HANGMAN GAME\n");
 printf("==================================\n");
 printf("Guess the hidden word.\n");
 printf("You have %d wrong attempts.\n",MAX_WRONG);
 printf("Press Enter to start...");
 getchar();

 while(wrongCount<MAX_WRONG && !won){
  clearScreen();
  printf("========== HANGMAN ==========");
  drawHangman(wrongCount);
  showWord(disp);
  printf("Wrong Attempts : %d/%d\n",wrongCount,MAX_WRONG);
  printf("Wrong Letters  : ");
  for(int i=0;i<wrongStored;i++) printf("%c ",wrong[i]);
  printf("\n\nEnter a letter: ");
  scanf(" %c",&ch);

  while(getchar()!='\n');

  if(ch>='A'&&ch<='Z') ch+=32;

  if(ch<'a'||ch>'z'){
    printf("Please enter letters only.\nPress Enter...");
    getchar();
    continue;
  }

  if(already(wrong,wrongStored,ch) || strchr(disp,ch)){
    printf("Letter already guessed.\nPress Enter...");
    getchar();
    continue;
  }

  if(!checkGuess(word,disp,ch)){
    wrong[wrongStored++]=ch;
    wrongCount++;
  }
  won=checkWin(disp);
 }

 clearScreen();
 drawHangman(wrongCount);
 if(won){
   printf("Congratulations!\n");
   printf("Word : %s\n",word);
   printf("You Win!\n");
 }
 else{
   printf("Game Over!\n");
   printf("The word was : %s\n",word);
 }
 printf("\nPlay Again? (y/n): ");
 scanf(" %c",&choice);
 while(getchar()!='\n');
 }while(choice=='y'||choice=='Y');

 printf("Thank you for playing!\n");
 return 0;
}
