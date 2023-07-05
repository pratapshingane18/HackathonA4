#include <iostream>
using namespace std;
class figure{
   public:
   figure() { }
   virtual
   ~figure() { }
   virtual void ChangeAttributes() = 0;
   static figure *Create(int id);
   virtual figure *Clone() = 0;
};
class square : public figure{
   public:
   square(){
      cout << "square created" << endl;
   }
   square(const square& rhs) { }
   ~square() { }
   void ChangeAttributes(){
      int a;
      cout<<"The side of square:";
      cin>>a;
      cout<<"Area of square is "<<a*a;
   }
   figure *Clone(){
      return new square(*this);
   }
};
class circle : public figure{
   public:
   circle(){
      cout << "circle created" << endl;
   }
   circle(const circle& rhs) { }
   ~circle() { }
   void ChangeAttributes(){
      int r;
      cout << "enter the radius of the circle ";
      cin>>r;
      cout<<"the area of circle is "<<((3.14)*r*r);
   }
   figure *Clone(){
      return new circle(*this);
   }
};
class rectangle : public figure{
   public:
   rectangle(){
      cout << "rectangle created" << endl;
   }
   rectangle(const rectangle& rhs) { }
   ~rectangle() { }
   void ChangeAttributes(){
      int a ,b;
      cout<<"The dimensions of rectangle ";
      cin>>a>>b;
      cout<<"Area of rectangle is "<<a*b;
   }
   figure*Clone(){
      return new rectangle(*this);
   }
};
figure *figure::Create(int id){
   if( id == 1 ){
      return new square;
   }
   else if( id == 2 ){
      return new circle;
   }
   else{
      return new rectangle;
   }
}
class User{
   public:
   User() : figures(0){
      int input;
      cout << "Enter ID (1, 2 or 3): ";
      cin >> input;
      while( (input != 1) && (input != 2) && (input != 3) ){
         cout << "Enter ID (1, 2 or 3 only): ";
         cin >> input;
      }
      figures = figure::Create(input);
   }
   ~User(){
      if( figures ){
         delete figures;
         figures = 0;
      }
   }
   void Action(){
      figure *newfigure = figures->Clone();
      newfigure->ChangeAttributes();
      delete newfigure;
   }
   private:
   figure *figures;
};
int main(){
   User *user = new User();
   user->Action();
   delete user;
}