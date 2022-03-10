using AutoMapper;
using DatingAPP.API.DTO;
using DatingAPP.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingAPP.API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                 {
                     opt.MapFrom(scr => scr.Photos.FirstOrDefault(p => p.IsMain).Url);
                 })
                .ForMember(dest => dest.Age, opt =>
                {
                    opt.MapFrom(D => D.DateofBirth.CalculateAge());
                });
            CreateMap<User, UserForDetailDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                {
                    opt.MapFrom(scr => scr.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                   .ForMember(dest => dest.Age, opt =>
                   {
                       opt.MapFrom(D => D.DateofBirth.CalculateAge());
                   });

            CreateMap<Photo, PhotosForDetailedDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<MessageForCreationDto, Message>().ReverseMap();
            CreateMap<Message, MessageToReturnDto>()
                .ForMember(m => m.SenderPhotoUrl, opt => opt.
                    MapFrom(u => u.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))

                .ForMember(m => m.RecipientPhotoUrl, opt => opt.
                    MapFrom(u => u.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url));

        }

    }
}
